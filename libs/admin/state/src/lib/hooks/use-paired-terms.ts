import { useAllTechnologies } from '@jobstash/shared/state';

export const usePairedTerms = () => {
  const { isLoading: isLoadingAllTechs } = useAllTechnologies();

  const isLoading = isLoadingAllTechs;

  return {
    isLoading,
  };
};
