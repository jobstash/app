import { useGodmodeBlockedTechnologiesQuery } from './use-godmode-blocked-technologies-query';
import { useGodmodeBlockedTermsMutation } from './use-godmode-blocked-terms-mutation';
import { useGodmodeTechnologiesQuery } from './use-godmode-technologies-query';

export const useBlockedTerms = () => {
  const { isLoading: isLoadingInitOptions, isSuccess: isSuccessAllData } =
    useGodmodeTechnologiesQuery();

  const { isLoading: isLoadingInitBlockedTerms } =
    useGodmodeBlockedTechnologiesQuery(isSuccessAllData);

  const { isLoading: isLoadingSetBlockedTerms, mutateSetBlockedTerms } =
    useGodmodeBlockedTermsMutation();

  const isLoading =
    isLoadingInitOptions ||
    isLoadingInitBlockedTerms ||
    isLoadingSetBlockedTerms;

  return {
    isLoading,
    mutateSetBlockedTerms,
  };
};
