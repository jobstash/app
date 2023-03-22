import { createContext } from 'react';

import type { CheckWalletData } from '../core/types';

interface WalletAuthCtx {
  isConnected: boolean;
  isSignedIn: boolean;
  isPageEmpty: boolean;
  checkWalletData: CheckWalletData | undefined;
}

export const WalletAuthContext = createContext<WalletAuthCtx>({
  isConnected: false,
  isSignedIn: false,
  checkWalletData: undefined,
  isPageEmpty: false,
});
