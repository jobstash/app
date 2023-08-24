import { useQuery } from '@tanstack/react-query';

import { getGodmodeBlockedTechnologies } from '@jobstash/admin/data';

export const useGodmodeBlockedTechnologiesQuery = () =>
  useQuery({
    queryKey: ['godmodeBlockedTechnologies'],
    queryFn: async () => getGodmodeBlockedTechnologies(),
  });
