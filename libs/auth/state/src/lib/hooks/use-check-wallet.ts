import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getCheckWallet } from '@jobstash/auth/data';

export const useCheckWallet = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const { mwVersion } = useMwVersionContext();

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: [mwVersion, 'check-wallet'],
    queryFn: () => getCheckWallet(),
    select: (data) => data.data,
    enabled: isConnected, // Only fetch when wallet is connected
    staleTime: 1000 * 60 * 60,
  });

  return {
    data,
    isLoading,
    isFetching,
    address,
    isConnected,
    isConnecting,
    refetch,
  };
};
