import { useMemo, useState } from 'react';

import { useTagsContext } from '../contexts/tags-context';

import { useCreatePreferenceMutation } from './use-create-preference-mutation';
import { useDeletePreferenceMutation } from './use-delete-preference-mutation';

export const usePreferredTermsForm = (
  initPrimaryTerm: string | null,
  initSynonyms: string[] | null,
) => {
  const isExisting = initPrimaryTerm !== null && initSynonyms !== null;

  const { mappedTags: tags } = useTagsContext();

  const [primaryTerm, setPrimaryTerm] = useState(initPrimaryTerm ?? '');
  const onChangePrimaryTerm = (v: string) => setPrimaryTerm(v);

  const [currentSynonyms, setCurrentSynonyms] = useState<{
    created: string[];
    deleted: string[];
  }>(defaultCurrentSynonyms);

  const synonyms = [...(initSynonyms ?? []), ...currentSynonyms.created].filter(
    (s) => !currentSynonyms.deleted.includes(s),
  );

  const synonymOptions = tags.filter(
    (t) => !synonyms.includes(t) && t !== primaryTerm,
  );

  const addSynonym = (term: string) => {
    setCurrentSynonyms((prev) => ({
      created: [
        ...prev.created,
        ...((initSynonyms ?? []).includes(term) ? [] : [term]),
      ],
      deleted: prev.deleted.filter((s) => s !== term),
    }));
  };

  const removeSynonym = (term: string) => {
    setCurrentSynonyms((prev) => ({
      created: prev.created.filter((s) => s !== term),
      deleted: [...prev.deleted, term],
    }));
  };

  const {
    isSuccessCreatePreference,
    isLoadingCreatePreference,
    mutateCreatePreference,
  } = useCreatePreferenceMutation();

  const {
    isSuccessDeletePreference,
    isLoadingDeletePreference,
    mutateDeletePreference,
  } = useDeletePreferenceMutation();

  const isLoadingMutation = [
    isLoadingCreatePreference,
    isLoadingDeletePreference,
  ].includes(true);

  const clearForm = () => {
    setPrimaryTerm('');
    setCurrentSynonyms(defaultCurrentSynonyms);
  };

  const isSuccess = isSuccessCreatePreference && isSuccessDeletePreference;

  const isDisabledSubmit =
    !primaryTerm ||
    JSON.stringify({ primaryTerm: initPrimaryTerm, synonyms: initSynonyms }) ===
      JSON.stringify({ primaryTerm, synonyms });

  return {
    primaryTerm,
    onChangePrimaryTerm,
    synonyms,
    synonymOptions,
    addSynonym,
    removeSynonym,
    isLoadingMutation,
    mutateCreatePreference,
    mutateDeletePreference,
    isExisting,
    currentSynonyms,
    clearForm,
    isSuccess,
    isDisabledSubmit,
  };
};

const defaultCurrentSynonyms = {
  created: [],
  deleted: [],
};
