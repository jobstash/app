import { useCallback, useEffect, useMemo, useState } from 'react';

import { useEnsName } from 'wagmi';

import { useAuthContext } from './use-auth-context';

const NAME_CHAR_LIMIT = 16;
const DEFAULT_TEXT = 'Login / Sign Up';

const formatName = (name = '') =>
  name.length > NAME_CHAR_LIMIT
    ? `${name?.slice(0, 6)}...${name?.slice(-4)}`
    : name;

export const useSessionName = () => {
  const { user, isLoggedIn, isLoading: isLoadingAuth } = useAuthContext();

  // Get wallet address except embedded privy wallet
  const addresses = useMemo(() => {
    if (!user) return [];
    return user.linkedAccounts
      .filter(
        (account) =>
          account.type === 'wallet' && account.walletClientType !== 'privy',
      )
      .map((account) => (account as { address: `0x${string}` }).address);
  }, [user]);

  const [ensName, setEnsName] = useState<string | null>(null);
  const [currentAddressIndex, setCurrentAddressIndex] = useState<number>(0);
  const currentAddress = addresses[currentAddressIndex];

  // Fetch ensName for current wallet address
  const { data: fetchedName, isLoading: isLoadingEns } = useEnsName({
    address: currentAddress,
    query: {
      enabled: Boolean(currentAddress),
    },
  });

  const isLoading = isLoadingAuth || isLoadingEns;

  // Reset ensName if user is not authenticated
  useEffect(() => {
    if (!isLoggedIn && Boolean(ensName)) setEnsName(null);
  }, [isLoggedIn, ensName]);

  // Update ensName if fetchedName is available or move to next address
  useEffect(() => {
    if (fetchedName) {
      setEnsName(fetchedName);
    } else if (!isLoading && currentAddressIndex < addresses.length - 1) {
      setCurrentAddressIndex(currentAddressIndex + 1);
    }
  }, [addresses.length, currentAddressIndex, isLoading, fetchedName]);

  const getTexts = useCallback(() => {
    if (!isLoggedIn) return { text: DEFAULT_TEXT, fullText: '' };

    const email = user?.email?.address;
    const github = user?.github?.username;
    const google = user?.google?.email;
    const farcaster = user?.farcaster?.username;
    const wallet = addresses[0];

    return {
      text: formatName(
        ensName ?? email ?? github ?? google ?? farcaster ?? wallet,
      ),
      fullText: ensName ?? email ?? github ?? google ?? farcaster ?? wallet,
    };
  }, [isLoggedIn, user, ensName, addresses]);

  return {
    isLoading,
    ...getTexts(),
  };
};
