import React from 'react';
import { AuthConsumer } from './authprovider';

export const Callback = () => (
  <AuthConsumer>
    {({ signinRedirectCallback }) => {
      signinRedirectCallback();
      return <span>loading</span>;
    }}
  </AuthConsumer>
);
