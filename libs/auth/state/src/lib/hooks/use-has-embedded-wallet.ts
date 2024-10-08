import { usePrivy } from '@privy-io/react-auth';

export const useHasEmbeddedWallet = () => {
  const { user } = usePrivy();

  if (!user) return false;

  return user.linkedAccounts.some(
    (account) =>
      account.type === 'wallet' && account.walletClientType === 'privy',
  );
};
