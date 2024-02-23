import { useRouter } from 'next/router';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { sendMagicLinkToken } from '@jobstash/auth/data';

export const useSendMagicLinkToken = (
  token: string | null,
  userType: 'dev' | 'org' | undefined,
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['send-magic-link', token, userType],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => sendMagicLinkToken(token!, userType!),
    enabled: Boolean(token) && Boolean(userType),

    onSuccess() {
      queryClient.invalidateQueries(['check-wallet']);
      if (userType === 'org') router.push('/profile');
    },
  });

  return { data, isLoading, isError };
};
