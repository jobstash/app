import { useQuery } from '@tanstack/react-query';

import { sendDevMagicLinkToken } from '@jobstash/auth/data';

export const useDevSendMagicLinkToken = (token: string | null) =>
  useQuery({
    queryKey: ['dev-send-magic-link', token],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => sendDevMagicLinkToken(token!),
    enabled: Boolean(token),
  });
