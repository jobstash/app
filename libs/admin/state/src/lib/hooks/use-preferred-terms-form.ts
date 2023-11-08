import { useMemo, useState } from 'react';

import { useTagsContext } from '../contexts/tags-context';

import { usePreferredTermsMutation } from './use-preferred-terms-mutation';

export const usePreferredTermsForm = (
  initPrimaryTerm: string | null,
  initSynonyms: string[] | null,
) => {
  const { mappedTags: tags } = useTagsContext();

  const [primaryTerm, setPrimaryTerm] = useState(initPrimaryTerm ?? '');
  const onChangePrimaryTerm = (v: string) => setPrimaryTerm(v);

  const [synonyms, setSynonyms] = useState(initSynonyms ?? []);

  const synonymOptions = useMemo(
    () => tags.filter((t) => !synonyms.includes(t) && t !== primaryTerm),
    [primaryTerm, synonyms, tags],
  );

  const addSynonym = (v: string) => setSynonyms((prev) => [...prev, v]);
  const removeSynonym = (v: string) =>
    setSynonyms((prev) => prev.filter((t) => t !== v));

  const { isLoading: isLoadingMutation, mutate } = usePreferredTermsMutation();

  return {
    primaryTerm,
    onChangePrimaryTerm,
    synonyms,
    synonymOptions,
    addSynonym,
    removeSynonym,
    isLoadingMutation,
    mutate,
  };
};
