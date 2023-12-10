import { useRouter } from 'next/router';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { sendMagicLinkToken } from '@jobstash/auth/data';

export const useSendMagicLinkToken = (token: string | null) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['send-magic-link', token],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => sendMagicLinkToken(token!),
    enabled: Boolean(token),
    onSuccess() {
      queryClient.invalidateQueries(['check-wallet']);
      push('/profile');
    },
  });

  return { data, isLoading };
};
