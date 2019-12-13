import React from 'react';
import { AuthConsumer } from './authprovider';

export const Logout = () => (
  <AuthConsumer>
    {({ logout }) => {
      logout();
      return <span>loading</span>;
    }}
  </AuthConsumer>
);
