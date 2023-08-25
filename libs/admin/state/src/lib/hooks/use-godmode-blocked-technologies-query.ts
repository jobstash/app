import { useQuery } from '@tanstack/react-query';

import { getGodmodeBlockedTechnologies } from '@jobstash/admin/data';

import { useBlockedTermsStore } from '../store/blocked-terms-store';

export const useGodmodeBlockedTechnologiesQuery = (enabled: boolean) => {
  const { setFetchedBlockedTerms } = useBlockedTermsStore();

  return useQuery({
    queryKey: ['godmodeBlockedTechnologies'],
    queryFn: async () => getGodmodeBlockedTechnologies(),
    onSuccess(data) {
      setFetchedBlockedTerms(data);
    },
    enabled,
  });
};
