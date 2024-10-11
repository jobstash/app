import { createContext } from 'react';

import { type AuthCtx } from '@jobstash/auth/core';

export const AuthContext = createContext<AuthCtx>({
  user: null,
  isCryptoNative: false,
  isLoading: false,
  isLoadingLogout: false,
  isLoggedIn: false,
  isAuthenticated: false,
  showLoginModal: () => null,
  logout: () => Promise.resolve(),
  orgs: [],
  permissions: [],
});
