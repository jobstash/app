import { createContext } from 'react';

import {
  type AuthCtx,
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROLES,
} from '@jobstash/auth/core';

export const AuthContext = createContext<AuthCtx>({
  isLoading: false,
  role: CHECK_WALLET_ROLES.DEFAULT,
  flow: CHECK_WALLET_FLOWS.DEFAULT,
  address: undefined,
  isConnected: false,
  isSignedIn: false,
  isFetching: false,
  refetch: () => null,
  mwVersion: undefined,
});
