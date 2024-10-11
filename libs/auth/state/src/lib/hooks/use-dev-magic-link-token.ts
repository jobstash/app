import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { sendMagicLinkToken } from '@jobstash/auth/data';

export const useDevSendMagicLinkToken = (token: string | null) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'dev-send-magic-link', token],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => sendMagicLinkToken(token!),
    enabled: Boolean(token),
  });
};
