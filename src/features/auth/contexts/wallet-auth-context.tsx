import { createContext } from 'react';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '../core/constants';
import type { CheckWalletFlow, CheckWalletRole } from '../core/types';

interface WalletAuthCtx {
  role: CheckWalletRole;
  flow: CheckWalletFlow;
  isConnected: boolean;
  isSignedIn: boolean;
  address: string | undefined;
  isLoading: boolean;
}

export const WalletAuthContext = createContext<WalletAuthCtx>({
  role: CHECK_WALLET_ROLES.ANON,
  flow: CHECK_WALLET_FLOWS.LOGIN,
  isConnected: false,
  isSignedIn: false,
  address: undefined,
  isLoading: false,
});
