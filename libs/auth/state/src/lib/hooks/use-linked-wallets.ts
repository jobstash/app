import { useMemo } from 'react';

import { usePrivy, Wallet } from '@privy-io/react-auth';

export const useLinkedWallets = () => {
  const { user } = usePrivy();

  return useMemo(() => {
    if (!user) return [];

    return user.linkedAccounts
      .filter(
        (account) =>
          account.type === 'wallet' && account.walletClientType !== 'privy',
      )
      .map((wallet) => (wallet as Wallet).address);
  }, [user]);
};
