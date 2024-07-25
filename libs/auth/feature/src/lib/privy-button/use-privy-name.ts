import { useEffect, useMemo, useState } from 'react';

import { usePrivy } from '@privy-io/react-auth';
import { useEnsName } from 'wagmi';

const NAME_CHAR_LIMIT = 16;

const formatName = (name?: string) =>
  (name ?? '').length > NAME_CHAR_LIMIT
    ? `${name?.slice(0, 6)}...${name?.slice(-4)}`
    : name;

const formatEmail = (email?: string) =>
  email ? `${formatName(email?.split('@')[0])}` : undefined;

export const usePrivyName = () => {
  const { user } = usePrivy();

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

  const { data: fetchedName, isLoading } = useEnsName({
    address: currentAddress,
    query: {
      enabled: Boolean(currentAddress),
    },
  });

  useEffect(() => {
    if (fetchedName) {
      setEnsName(fetchedName);
    } else if (!isLoading && currentAddressIndex < addresses.length - 1) {
      setCurrentAddressIndex(currentAddressIndex + 1);
    }
  }, [addresses.length, currentAddressIndex, isLoading, fetchedName]);

  const email = formatEmail(user?.email?.address);
  const github = user?.github?.username;
  const wallet = addresses[0];
  const embedded = user?.wallet?.address;

  return formatName(ensName ?? email ?? github ?? wallet ?? embedded);
};
