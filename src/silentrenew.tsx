import React from 'react';
import { AuthConsumer } from './authprovider';

export const SilentRenew = () => (
  <AuthConsumer>
    {({ signinSilentCallback }) => {
      signinSilentCallback();
      return <span>loading</span>;
    }}
  </AuthConsumer>
);
