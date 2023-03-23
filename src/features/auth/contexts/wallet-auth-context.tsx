import { createContext } from 'react';

import { CheckWalletResponse } from '../core/types';

interface WalletAuthCtx {
  isConnected: boolean;
  isSignedIn: boolean;
  isPageEmpty: boolean;
  checkWalletData: CheckWalletResponse | undefined;
  address: string | undefined;
  refetch: () => void;
}

export const WalletAuthContext = createContext<WalletAuthCtx>({
  isConnected: false,
  isSignedIn: false,
  isPageEmpty: false,
  checkWalletData: undefined,
  address: undefined,
  refetch: () => null,
});
