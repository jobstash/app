import { ReactNode, useMemo } from 'react';

import { WalletAuthContext } from '../contexts/wallet-auth-context';
import { useCheckWallet } from '../hooks/use-check-wallet';

interface Props {
  children: ReactNode;
}

export const WalletAuthProvider = ({ children }: Props) => {
  const { role, flow, isConnected, isSignedIn, address, isLoading } =
    useCheckWallet();

  const memoed = useMemo(
    () => ({
      role,
      flow,
      isConnected,
      isSignedIn,
      address,
      isLoading,
    }),
    [address, flow, isConnected, isLoading, isSignedIn, role],
  );

  return (
    <WalletAuthContext.Provider value={memoed}>
      {children}
    </WalletAuthContext.Provider>
  );
};
