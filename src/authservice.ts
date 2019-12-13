import { Log, SigninRequest, UserManager, WebStorageStateStore } from 'oidc-client';
import { IDENTITY_CONFIG, METADATA_OIDC } from './oidcconfig';

export interface AuthContextInterface {
  createSigninRequest: () => Promise<SigninRequest>;
  isAuthenticated: () => boolean;
  logout: () => void;
  signinRedirect: () => void;
  signinRedirectCallback: () => void;
  signinSilentCallback: () => void;
  signoutRedirectCallback: () => void;
}

export default class AuthService implements AuthContextInterface {
  private accessToken: string = '';
  private userManager: UserManager;

  constructor() {
    this.userManager = new UserManager({
      ...IDENTITY_CONFIG,
      metadata: {
        ...METADATA_OIDC
      },
      userStore: new WebStorageStateStore({ store: window.localStorage })
    });

    this.initializeEvents();

    // Logger
    Log.logger = console;
    Log.level = Log.DEBUG;
  }

  public signinRedirectCallback = () => {
    this.userManager.signinRedirectCallback().then(() => {
      '';
    });
  };

  public getUser = async () => {
    const user = await this.userManager.getUser();
    if (!user) {
      return await this.userManager.signinRedirectCallback();
    }
    return user;
  };

  public parseJwt = token => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  public setUserInfo = authResult => {
    const data = this.parseJwt(this.accessToken);

    this.setSessionInfo(authResult);
    this.setUser(data);
  };

  public signinRedirect = () => {
    localStorage.setItem('redirectUri', window.location.pathname);
    this.userManager.signinRedirect({});
  };

  public setUser = data => {
    localStorage.setItem('userId', data.sub);
  };

  public navigateToScreen = () => {
    const redirectUri = !!localStorage.getItem('redirectUri') ? localStorage.getItem('redirectUri') : '/en/dashboard';
    const language = '/' + redirectUri.split('/')[1];

    window.location.replace(language + '/dashboard');
  };

  public setSessionInfo(authResult) {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }

  public isAuthenticated = () => {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken;
  };

  public signinSilent = () => {
    this.userManager
      .signinSilent()
      .then(user => {
        console.log('signed in', user);
      })
      .catch(err => {
        console.log(err);
      });
  };
  public signinSilentCallback = () => {
    this.userManager.signinSilentCallback();
  };

  public createSigninRequest = () => {
    return this.userManager.createSigninRequest();
  };

  public logout = () => {
    this.userManager.signoutRedirect({
      id_token_hint: localStorage.getItem('id_token')
    });
    this.userManager.clearStaleState();
  };

  public signoutRedirectCallback = () => {
    this.userManager.signoutRedirectCallback().then(() => {
      localStorage.clear();
      //window.location.replace(process.env.REACT_APP_PUBLIC_URL);
    });
    this.userManager.clearStaleState();
  };

  private initializeEvents() {
    this.userManager.events.addUserLoaded(user => {
      this.accessToken = user.access_token;
      localStorage.setItem('access_token', user.access_token);
      localStorage.setItem('id_token', user.id_token);
      this.setUserInfo({
        accessToken: this.accessToken,
        idToken: user.id_token
      });
      if (window.location.href.indexOf('signin-oidc') !== -1) {
        this.navigateToScreen();
      }
    });
    this.userManager.events.addSilentRenewError(e => {
      console.log('silent renew error', e.message);
    });

    this.userManager.events.addAccessTokenExpired(() => {
      console.log('token expired');
      this.signinSilent();
    });
  }
}
