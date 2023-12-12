import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { getCheckWallet } from '@jobstash/auth/data';

export const useCheckWallet = () => {
  const { isConnected, isConnecting } = useAccount();

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['check-wallet'],
    queryFn: () => getCheckWallet(),
    select: (data) => data.data,
    enabled: isConnected, // Only fetch when wallet is connected
  });

  return {
    data,
    isLoading,
    isFetching,
    isConnected,
    isConnecting,
    refetch,
  };
};
