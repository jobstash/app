import { useQuery } from '@tanstack/react-query';

import { useAllTechnologies } from '@jobstash/shared/state';
import { getBlockedTechnologies } from '@jobstash/admin/data';

import { useTechnologiesStore } from '../store/technologies-store';

export const useBlockedTechnologiesQuery = () => {
  const { isSuccess: enabled } = useAllTechnologies();

  const setFetchedBlockedTerms = useTechnologiesStore(
    (state) => state.setFetchedBlockedTerms,
  );

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
