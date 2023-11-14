import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { type PreferredTermsFormContextProps } from '../contexts/preferred-terms-form-context';
import { useTagsContext } from '../contexts/tags-context';

import { useCreatePreferenceMutation } from './use-create-preference-mutation';
import { useDeletePreferenceMutation } from './use-delete-preference-mutation';

export const usePreferredTermsForm = (
  initPrimaryTerm: string | null,
  initSynonyms: string[] | null,
): PreferredTermsFormContextProps => {
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

  const clearForm = () => {
    if (!isExisting) {
      setPrimaryTerm('');
    }

    setCurrentSynonyms(defaultCurrentSynonyms);
  };

  const { isLoadingCreatePreference, mutateAsyncCreatePreference } =
    useCreatePreferenceMutation();

  const { isLoadingDeletePreference, mutateDeletePreference } =
    useDeletePreferenceMutation();

  const queryClient = useQueryClient();
  const onSubmit = async () => {
    const promises = [];
    if (currentSynonyms.created.length > 0) {
      promises.push(
        mutateAsyncCreatePreference({
          preferredName: primaryTerm,
          synonyms: currentSynonyms.created,
        }),
      );
    }

    if (currentSynonyms.deleted.length > 0) {
      promises.push(
        mutateDeletePreference({
          preferredName: primaryTerm,
          synonyms: currentSynonyms.deleted,
        }),
      );
    }

    await Promise.all(promises);

    clearForm();

    queryClient.invalidateQueries({
      queryKey: ['preferredTerms'],
    });
  };

  const isLoadingMutation = [
    isLoadingCreatePreference,
    isLoadingDeletePreference,
  ].includes(true);

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
    isExisting,
    currentSynonyms,
    isDisabledSubmit,
    onSubmit,
  };
};

const defaultCurrentSynonyms = {
  created: [],
  deleted: [],
};
