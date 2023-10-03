import { useQuery } from '@tanstack/react-query';

import { getPreferredTerms } from '@jobstash/admin/data';

import { useTagsStore } from '../store/tags-store';

export const usePreferredTermsQuery = () => {
  const setPreferredTerms = useTagsStore((state) => state.setPreferredTerms);

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
