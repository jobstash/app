import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { sendDevMagicLinkToken } from '@jobstash/auth/data';

export const useDevSendMagicLinkToken = (token: string | null) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'dev-send-magic-link', token],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => sendDevMagicLinkToken(token!),
    enabled: Boolean(token),
  });
};
