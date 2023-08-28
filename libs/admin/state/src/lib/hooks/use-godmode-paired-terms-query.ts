import { useQuery } from '@tanstack/react-query';

import { getGodmodePairedTerms } from '@jobstash/admin/data';

export const useGodmodePairedTermsQuery = () =>
  useQuery({
    queryKey: ['godmodePairedTerms'],
    queryFn: async () => getGodmodePairedTerms(),
  });
