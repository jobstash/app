import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { useNProgress } from '@jobstash/shared/state';
import { getCheckWallet } from '@jobstash/auth/data';

export const useCheckWallet = () => {
  const { isConnected, isConnecting } = useAccount();

  const { startNProgress, stopNProgress } = useNProgress();

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['check-wallet'],
    queryFn() {
      startNProgress();
      return getCheckWallet();
    },
    select: (data) => data.data,
    enabled: isConnected, // Only fetch when wallet is connected
    staleTime: 1000 * 60 * 60,
    onSettled: () => stopNProgress(),
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
