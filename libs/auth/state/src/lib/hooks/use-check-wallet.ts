import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getCheckWallet } from '@jobstash/auth/data';

export const useCheckWallet = (authenticated: boolean) => {
  const { mwVersion } = useMwVersionContext();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [mwVersion, 'check-wallet'],
    queryFn: () => getCheckWallet(),
    select: (data) => data.data,
    enabled: authenticated, // Only fetch when wallet authenticated
    staleTime: 1000 * 60 * 60,
  });

  return {
    data,
    isLoading,
    isFetching,
  };
};
