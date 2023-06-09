import { useQuery } from '@tanstack/react-query';

import { getSiweSession } from '@jobstash/auth/data';

export const useSiweSession = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['siwe-session'],
    queryFn: getSiweSession,
    staleTime: 3_600_000, // 1 hr
  });
  return {
    siweSessionData: data?.data,
    siweSessionError: error,
    siweSessionIsLoading: isLoading,
  };
};
