import { useQuery } from '@tanstack/react-query';

import { type Competitor } from '@jobstash/competitors/core';
import { getLSMwVersion } from '@jobstash/shared/utils';

import { getCompetitors } from '@jobstash/competitors/data';

export const useCompetitors = (id: string | undefined) => {
  const mwVersion = getLSMwVersion();

  return useQuery<Competitor[]>({
    queryKey: [mwVersion, 'competitors', id],
    queryFn: () => getCompetitors(id),
    staleTime: 1000 * 60 * 60, // 1 hr
    enabled: Boolean(id),
  });
};
