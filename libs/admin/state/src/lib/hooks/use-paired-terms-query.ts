import { useQuery } from '@tanstack/react-query';

import { useAllTechnologies } from '@jobstash/shared/state';
import { getPairedTerms } from '@jobstash/admin/data';

import { useTechnologiesStore } from '../store/technologies-store';

export const usePairedTermsQuery = () => {
  const { isSuccess: enabled } = useAllTechnologies();

  const { setPairedTerms } = useTechnologiesStore();
  const { isLoading: isLoadingPairedTermsQuery } = useQuery({
    queryKey: ['godmodePairedTerms'],
    queryFn: async () => getPairedTerms(),
    onSuccess(data) {
      setPairedTerms(data);
    },
    enabled,
  });

  return {
    isLoadingPairedTermsQuery,
  };
};
