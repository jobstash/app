import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import NProgress from 'nprogress';
import { useAccount } from 'wagmi';

import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROUTE,
  CheckWalletFlow,
} from '@jobstash/auth/core';

import { getCheckWallet } from '@jobstash/auth/data';

const redirectFlowsSet = new Set<CheckWalletFlow>([
  CHECK_WALLET_FLOWS.PICK_ROLE,
]);

export const useCheckWallet = (cb?: () => void) => {
  const { push } = useRouter();
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
    onSuccess({ flow }) {
      if (redirectFlowsSet.has(flow)) {
        push(CHECK_WALLET_ROUTE[flow]);
      }

      if (cb) {
        cb();
      }
    },
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
