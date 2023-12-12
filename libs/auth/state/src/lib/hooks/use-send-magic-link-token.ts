import { useQuery, useQueryClient } from '@tanstack/react-query';

import { sendMagicLinkToken } from '@jobstash/auth/data';

export const useSendMagicLinkToken = (token: string | null) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['send-magic-link', token],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => sendMagicLinkToken(token!),
    enabled: Boolean(token),
    onSuccess() {
      queryClient.invalidateQueries(['check-wallet']);
    },
  });

  return { data, isLoading, isError };
};