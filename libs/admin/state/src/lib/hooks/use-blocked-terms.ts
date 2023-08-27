import { useGodmodeBlockedTechnologiesQuery } from './use-godmode-blocked-technologies-query';
import { useGodmodeBlockedTermsMutation } from './use-godmode-blocked-terms-mutation';
import { useGodmodeTechnologiesQuery } from './use-godmode-technologies-query';
import { useGodmodeUnsetBlockedTermsMutation } from './use-godmode-unset-blocked-terms-mutation';

export const useBlockedTerms = () => {
  const { isLoading: isLoadingInitOptions, isSuccess: isSuccessAllData } =
    useGodmodeTechnologiesQuery();

  const {
    isLoading: isLoadingInitBlockedTerms,
    isFetching: isFetchingBlockedTerms,
  } = useGodmodeBlockedTechnologiesQuery(isSuccessAllData);

  const { isLoadingSetBlockedTerms, mutateSetBlockedTerms } =
    useGodmodeBlockedTermsMutation();

  const { isLoadingUnsetBlockedTerms, mutateUnsetBlockedTerms } =
    useGodmodeUnsetBlockedTermsMutation();

  const isLoading =
    isLoadingInitOptions ||
    isLoadingInitBlockedTerms ||
    isLoadingSetBlockedTerms ||
    isLoadingUnsetBlockedTerms;

  return {
    isLoading,
    mutateSetBlockedTerms,
    mutateUnsetBlockedTerms,
    isFetchingBlockedTerms,
  };
};
