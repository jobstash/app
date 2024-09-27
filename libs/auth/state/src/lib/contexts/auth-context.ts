import { createContext } from 'react';

import {
  type AuthCtx,
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROLES,
} from '@jobstash/auth/core';

export const AuthContext = createContext<AuthCtx>({
  user: null,
  role: CHECK_WALLET_ROLES.ANON,
  flow: CHECK_WALLET_FLOWS.DEFAULT,
  isCryptoNative: false,
  isLoading: false,
  isLoadingLogout: false,
  isLoggedIn: false,
  isAuthenticated: false,
  showLoginModal: () => null,
  logout: () => Promise.resolve(),
  orgs: [],
});
