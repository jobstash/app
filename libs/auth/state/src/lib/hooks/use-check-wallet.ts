import { useQuery } from '@tanstack/react-query';
import NProgress from 'nprogress';
import { useAccount } from 'wagmi';

import { getCheckWallet } from '@jobstash/auth/data';

export const useCheckWallet = () => {
  const { isConnected, isConnecting } = useAccount();

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['check-wallet'],
    queryFn() {
      NProgress.start();
      return getCheckWallet();
    },
    select: (data) => data.data,
    enabled: isConnected, // Only fetch when wallet is connected
    staleTime: 1000 * 60 * 60,
    onSettled: () => NProgress.done(),
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
