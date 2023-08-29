import { useQuery } from '@tanstack/react-query';

import { getGodmodePairedTerms } from '@jobstash/admin/data';

import { usePairedTermsStore } from '../store/paired-terms-store';

export const useGodmodePairedTermsQuery = () => {
  const { setPairedTerms } = usePairedTermsStore();
  const { isLoading: isLoadingPairedTermsQuery } = useQuery({
    queryKey: ['godmodePairedTerms'],
    queryFn: async () => getGodmodePairedTerms(),
    onSuccess(data) {
      setPairedTerms(data);
    },
  });

  return {
    isLoadingPairedTermsQuery,
  };
};
