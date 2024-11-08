import { useQuery } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getHighlightOrgOptions } from '@jobstash/organizations/data';

export const useHighlightOrgOptions = () => {
  const { mwVersion } = useMwVersionContext();

  return useQuery({
    queryKey: [mwVersion, 'highlight-org-options'],
    queryFn: async () => getHighlightOrgOptions(),
    staleTime: 1000 * 60 * 60,
    select: (data) => data.map((d) => ({ ...d, value: d.orgId })),
  });
};
