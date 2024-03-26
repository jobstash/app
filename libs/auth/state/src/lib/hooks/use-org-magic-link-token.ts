import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { sendOrgMagicLinkToken } from '@jobstash/auth/data';

export const useOrgSendMagicLinkToken = (token: string | null) => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'org-send-magic-link', token],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => sendOrgMagicLinkToken(token!),
    enabled: Boolean(token),
  });
};
