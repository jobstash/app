import { useQuery } from '@tanstack/react-query';

import { getSiweMessage } from '@jobstash/auth/data';

export const useSiweMessage = ({
  nonce,
  address,
}: {
  nonce?: string;
  address?: string;
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['siwe-message', { nonce, address }],
    queryFn: async () =>
      getSiweMessage({ nonce: nonce as string, address: address as string }),
    enabled: Boolean(nonce) && Boolean(address),
    staleTime: 3_600_000, // 1 hr
  });

  return {
    siweMessageData: data?.siweMessage,
    siweMessageError: error,
    siweMessageIsLoading: isLoading,
  };
};
