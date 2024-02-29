import { useQuery } from '@tanstack/react-query';

import { sendOrgMagicLinkToken } from '@jobstash/auth/data';

export const useOrgSendMagicLinkToken = (token: string | null) =>
  useQuery({
    queryKey: ['org-send-magic-link', token],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => sendOrgMagicLinkToken(token!),
    enabled: Boolean(token),
  });
