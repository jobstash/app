import { useQuery } from '@tanstack/react-query';

import { getSiweNonce } from '@jobstash/auth/data';

export const useSiweNonce = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['siwe-nonce'],
    queryFn: getSiweNonce,
    staleTime: 3_600_000, // 1 hr
  });

  return {
    siweNonceData: data?.data,
    siweNonceError: error,
    siweNonceIsLoading: isLoading,
  };
};
