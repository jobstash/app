import { useQuery } from '@tanstack/react-query';

import { getPreferredTerms } from '@jobstash/admin/data';

import { useTechnologiesStore } from '../store/technologies-store';

export const usePreferredTermsQuery = () => {
  const setPreferredTerms = useTechnologiesStore(
    (state) => state.setPreferredTerms,
  );

  const { isLoading: isLoadingPreferredTerms } = useQuery({
    queryKey: ['preferredTerms'],
    queryFn: async () => getPreferredTerms(),
    onSuccess(data) {
      setPreferredTerms(data);
    },
  });

  return {
    isLoadingPreferredTerms,
  };
};
