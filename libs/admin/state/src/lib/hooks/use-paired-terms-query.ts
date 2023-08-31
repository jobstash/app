import { useQuery } from '@tanstack/react-query';

import { getPairedTerms } from '@jobstash/admin/data';

import { usePairedTermsStore } from '../store/paired-terms-store';

export const usePairedTermsQuery = () => {
  const { setPairedTerms } = usePairedTermsStore();
  const { isLoading: isLoadingPairedTermsQuery } = useQuery({
    queryKey: ['godmodePairedTerms'],
    queryFn: async () => getPairedTerms(),
    onSuccess(data) {
      setPairedTerms(data);
    },
  });

  return {
    isLoadingPairedTermsQuery,
  };
};
