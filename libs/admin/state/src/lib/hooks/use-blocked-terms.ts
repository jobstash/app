import { useAllTechnologies } from '@jobstash/shared/state';

import { useBlockedTermsStore } from '../store/blocked-terms-store';

import { useBlockedTechnologiesQuery } from './use-blocked-technologies-query';
import { useBlockedTermsMutation } from './use-blocked-terms-mutation';
import { useUnsetBlockedTermsMutation } from './use-unset-blocked-terms-mutation';

export const useBlockedTerms = () => {
  const { setAllTerms } = useBlockedTermsStore();

  const {
    isLoading: isLoadingAllTechnologies,
    isSuccess: isSuccessAllTechnologies,
  } = useAllTechnologies({
    onSuccess({ data }) {
      const terms = data.length > 0 ? data.map((d) => d.name) : [];
      setAllTerms(terms);
    },
  });

  const { isLoadingInitBlockedTerms, isFetchingBlockedTerms } =
    useBlockedTechnologiesQuery(isSuccessAllTechnologies);

  const { isLoadingSetBlockedTerms, mutateSetBlockedTerms } =
    useBlockedTermsMutation();

  const { isLoadingUnsetBlockedTerms, mutateUnsetBlockedTerms } =
    useUnsetBlockedTermsMutation();

  const isLoading = [
    isLoadingAllTechnologies,
    isLoadingInitBlockedTerms,
    isLoadingSetBlockedTerms,
    isLoadingUnsetBlockedTerms,
  ].includes(true);

  return {
    isLoading,
    mutateSetBlockedTerms,
    mutateUnsetBlockedTerms,
    isFetchingBlockedTerms,
  };
};
