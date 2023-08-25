import { useQuery } from '@tanstack/react-query';

import { getGodmodeTechnologies } from '@jobstash/admin/data';

import { useBlockedTermsStore } from '../store/blocked-terms-store';

export const useGodmodeTechnologiesQuery = () => {
  const { setAllTerms } = useBlockedTermsStore();

  return useQuery({
    queryKey: ['godmodeTechnologies'],
    queryFn: async () => getGodmodeTechnologies(),
    onSuccess(data) {
      console.log('GODMODE TECH ONSUCCESS DATA =', data);
      setAllTerms(data);
    },
  });
};
