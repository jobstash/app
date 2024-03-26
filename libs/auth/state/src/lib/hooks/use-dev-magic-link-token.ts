import { useQuery } from '@tanstack/react-query';

import { getLSMwVersion } from '@jobstash/shared/utils';

import { sendDevMagicLinkToken } from '@jobstash/auth/data';

export const useDevSendMagicLinkToken = (token: string | null) => {
  const mwVersion = getLSMwVersion();

  return useQuery({
    queryKey: [mwVersion, 'dev-send-magic-link', token],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => sendDevMagicLinkToken(token!),
    enabled: Boolean(token),
  });
};
