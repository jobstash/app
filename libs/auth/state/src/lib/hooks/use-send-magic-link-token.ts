import { useQuery } from '@tanstack/react-query';

import { sendMagicLinkToken } from '@jobstash/auth/data';

export const useSendMagicLinkToken = (
  token: string | null,
  userType: 'dev' | 'org' | undefined,
) =>
  useQuery({
    queryKey: ['send-magic-link', token, userType],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => sendMagicLinkToken(token!, userType!),
    enabled: Boolean(token) && Boolean(userType),
  });
