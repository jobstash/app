import { useAllTechnologies } from '@jobstash/shared/state';

import { useBlockedTermsStore } from '../store/blocked-terms-store';

import { useGodmodeBlockedTechnologiesQuery } from './use-godmode-blocked-technologies-query';
import { useGodmodeBlockedTermsMutation } from './use-godmode-blocked-terms-mutation';
import { useGodmodeUnsetBlockedTermsMutation } from './use-godmode-unset-blocked-terms-mutation';

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
    useGodmodeBlockedTechnologiesQuery(isSuccessAllTechnologies);

  const { isLoadingSetBlockedTerms, mutateSetBlockedTerms } =
    useGodmodeBlockedTermsMutation();

  const { isLoadingUnsetBlockedTerms, mutateUnsetBlockedTerms } =
    useGodmodeUnsetBlockedTermsMutation();

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
