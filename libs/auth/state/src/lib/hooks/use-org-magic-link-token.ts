import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { sendOrgMagicLinkToken } from '@jobstash/auth/data';

export const useOrgSendMagicLinkToken = (token: string | null) => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'org-send-magic-link', token],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => sendOrgMagicLinkToken(token!),
    enabled: Boolean(token),
  });
};
