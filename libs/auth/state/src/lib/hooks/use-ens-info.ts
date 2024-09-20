import { useEffect, useState } from 'react';

import { normalize } from 'viem/ens';
import { useEnsAvatar, useEnsName } from 'wagmi';

import { useAuthContext } from './use-auth-context';
import { useLinkedWallets } from './use-linked-wallets';

export const useEnsInfo = () => {
  const { isLoading: isLoadingAuth } = useAuthContext();

  // Get wallet address except embedded privy wallet
  const addresses = useLinkedWallets() as `0x${string}`[];

  const [ensName, setEnsName] = useState<string | null>(null);
  const [currentAddressIndex, setCurrentAddressIndex] = useState<number>(0);
  const currentAddress = addresses[currentAddressIndex];

  const { data: fetchedName, isLoading: isLoadingEns } = useEnsName({
    address: currentAddress,
    query: {
      enabled: Boolean(currentAddress),
    },
  });

  const isLoadingEnsName = isLoadingAuth || isLoadingEns;

  // Reset ensName if user is not authenticated
  const { isLoggedIn } = useAuthContext();
  useEffect(() => {
    if (!isLoggedIn && Boolean(ensName)) setEnsName(null);
  }, [isLoggedIn, ensName]);

  // Update ensName if fetchedName is available or move to next address
  useEffect(() => {
    if (fetchedName) {
      setEnsName(fetchedName);
    } else if (
      !isLoadingEnsName &&
      currentAddressIndex < addresses.length - 1
    ) {
      setCurrentAddressIndex(currentAddressIndex + 1);
    }
  }, [addresses.length, currentAddressIndex, isLoadingEnsName, fetchedName]);

  const { data: avatar, isLoading: isLoadingAvatar } = useEnsAvatar({
    name: ensName ? normalize(ensName) : undefined,
  });

  return {
    isLoading: isLoadingEnsName || isLoadingAvatar,
    ensName,
    ensAvatar: typeof avatar === 'string' ? (avatar as string) : undefined,
  };
};
