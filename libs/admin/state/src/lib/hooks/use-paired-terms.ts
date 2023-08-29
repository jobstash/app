import { useAllTechnologies } from '@jobstash/shared/state';

import { usePairedTermsStore } from '../store/paired-terms-store';

import { useGodmodePairedTermsMutation } from './use-godmode-paired-terms-mutation';
import { useGodmodePairedTermsQuery } from './use-godmode-paired-terms-query';

export const usePairedTerms = () => {
  const { setAllTerms } = usePairedTermsStore();
  const { isLoading: isLoadingGodmodeTechnologiesQuery } = useAllTechnologies({
    onSuccess({ data }) {
      const terms = data.length > 0 ? data.map((d) => d.name) : [];
      setAllTerms(terms);
    },
  });

  const { isLoadingPairedTermsQuery } = useGodmodePairedTermsQuery();

  const { isLoadingPairedTermsMutation, mutatePairedTerms } =
    useGodmodePairedTermsMutation();

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
