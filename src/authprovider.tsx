import React, {Component} from 'react';
import AuthService, {AuthContextInterface} from './authservice';

const AuthContext = React.createContext<AuthContextInterface | null>(null);

export const AuthConsumer = AuthContext.Consumer;

// Wrapper for our context provider to inject the authService in it
export class AuthProvider extends Component {
  public authService: AuthService;
  constructor(props: Readonly<{}>) {
    super(props);
    this.authService = new AuthService();
  }
  public render() {
    return <AuthContext.Provider value={this.authService}>{this.props.children}</AuthContext.Provider>;
  }
}
