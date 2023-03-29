import { createContext } from 'react';

import { CHECK_WALLET_ROLES } from '../core/constants';
import { CheckWalletFlow, CheckWalletRole } from '../core/types';

interface WalletAuthCtx {
  isConnected: boolean;
  isSignedIn: boolean;
  isLoading: boolean;
  isPageEmpty: boolean;
  role: CheckWalletRole;
  flow: CheckWalletFlow | undefined;
  address: string | undefined;
}

export const WalletAuthContext = createContext<WalletAuthCtx>({
  isConnected: false,
  isSignedIn: false,
  isLoading: false,
  isPageEmpty: false,
  role: CHECK_WALLET_ROLES.ANON,
  flow: undefined,
  address: undefined,
});
