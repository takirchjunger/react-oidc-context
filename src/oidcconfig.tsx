export const IDENTITY_CONFIG = {
  audience: 'https://example.com', // is there a way to specific the audience when making the jwt
  authority: process.env.REACT_APP_AUTH_URL, // (string): The URL of the OIDC provider.
  automaticSilentRenew: false, // (boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
  client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID, // (string): Your client application's identifier as registered with the OIDC provider.
  grantType: 'password',
  loadUserInfo: false, // (boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
  login: process.env.REACT_APP_AUTH_URL + '/login',
  post_logout_redirect_uri: process.env.REACT_APP_LOGOFF_REDIRECT_URL, // (string): The OIDC post-logout redirect URI.
  redirect_uri: process.env.REACT_APP_REDIRECT_URL, // The URI of your client application to receive a response from the OIDC provider.
  responseType: 'id_token token', // (string, default: 'id_token'): The type of response desired from the OIDC provider.
  scope: 'openid example.api', // (string, default: 'openid'): The scope being requested from the OIDC provider.
  silent_redirect_uri: process.env.REACT_APP_SILENT_REDIRECT_URL, // (string): The URL for the page containing the code handling the silent renew.
  webAuthResponseType: 'id_token token'
};

export const METADATA_OIDC = {
  authorization_endpoint: process.env.REACT_APP_AUTH_URL + '/connect/authorize',
  check_session_iframe: process.env.REACT_APP_AUTH_URL + '/connect/checksession',
  end_session_endpoint: process.env.REACT_APP_AUTH_URL + '/connect/endsession',
  introspection_endpoint: process.env.REACT_APP_AUTH_URL + '/connect/introspect',
  issuer: 'https://identityserver',
  jwks_uri: process.env.REACT_APP_AUTH_URL + '/.well-known/openid-configuration/jwks',
  revocation_endpoint: process.env.REACT_APP_AUTH_URL + '/connect/revocation',
  token_endpoint: process.env.REACT_APP_AUTH_URL + '/connect/token',
  userinfo_endpoint: process.env.REACT_APP_AUTH_URL + '/connect/userinfo'
};
