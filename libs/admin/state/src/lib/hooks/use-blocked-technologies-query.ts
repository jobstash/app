import { useQuery } from '@tanstack/react-query';

import { getBlockedTechnologies } from '@jobstash/admin/data';

import { useBlockedTermsStore } from '../store/blocked-terms-store';

export const useBlockedTechnologiesQuery = (enabled: boolean) => {
  const { setFetchedBlockedTerms } = useBlockedTermsStore();

  const {
    isLoading: isLoadingInitBlockedTerms,
    isFetching: isFetchingBlockedTerms,
  } = useQuery({
    queryKey: ['godmodeBlockedTechnologies'],
    queryFn: async () => getBlockedTechnologies(),
    onSuccess(data) {
      setFetchedBlockedTerms(data);
    },
    enabled,
  });

  return {
    isLoadingInitBlockedTerms,
    isFetchingBlockedTerms,
  };
};
