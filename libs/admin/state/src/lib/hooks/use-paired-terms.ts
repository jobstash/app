import { useAllTechnologies } from '@jobstash/shared/state';

import { usePairedTermsStore } from '../store/paired-terms-store';

import { usePairedTermsMutation } from './use-paired-terms-mutation';
import { usePairedTermsQuery } from './use-paired-terms-query';

export const usePairedTerms = () => {
  const { setAllTerms } = usePairedTermsStore();
  const { isLoading: isLoadingGodmodeTechnologiesQuery } = useAllTechnologies({
    onSuccess({ data }) {
      const terms = data.length > 0 ? data.map((d) => d.name) : [];
      setAllTerms(terms);
    },
  });

  const { isLoadingPairedTermsQuery } = usePairedTermsQuery();

  const { isLoadingPairedTermsMutation, mutatePairedTerms } =
    usePairedTermsMutation();

  const isLoading = [
    isLoadingGodmodeTechnologiesQuery,
    isLoadingPairedTermsQuery,
    isLoadingPairedTermsMutation,
  ].includes(true);

  return {
    isLoading,
    mutatePairedTerms,
  };
};
