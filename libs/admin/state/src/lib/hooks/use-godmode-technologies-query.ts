import { useQuery } from '@tanstack/react-query';

import { getGodmodeTechnologies } from '@jobstash/admin/data';

export const useGodmodeTechnologiesQuery = () =>
  useQuery({
    queryKey: ['godmodeTechnologies'],
    queryFn: async () => getGodmodeTechnologies(),
  });
