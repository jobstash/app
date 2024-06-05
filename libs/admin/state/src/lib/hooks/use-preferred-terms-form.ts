import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';

import { type PreferredTermsFormContextProps } from '../contexts/preferred-terms-form-context';
import { useTagsContext } from '../contexts/tags-context';

import { useCreatePreferenceMutation } from './use-create-preference-mutation';
import { useDeletePreferenceMutation } from './use-delete-preference-mutation';
import { useDeleteSynonymsMutation } from './use-delete-synonyms-mutation';

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
      deleted: (initSynonyms ?? []).includes(term)
        ? [...prev.deleted, term]
        : prev.deleted,
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

  const { isLoadingDeleteSynonyms, mutateAsyncDeleteSynonyms } =
    useDeleteSynonymsMutation();

  const { isLoadingDeletePreference, mutateAsyncDeletePreference } =
    useDeletePreferenceMutation();

  const { mwVersion } = useMwVersionContext();

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
        mutateAsyncDeleteSynonyms({
          preferredName: primaryTerm,
          synonyms: currentSynonyms.deleted,
        }),
      );
    }

    await Promise.allSettled(promises);

    clearForm();

    await queryClient.invalidateQueries({
      queryKey: [mwVersion, 'preferredTerms'],
    });
  };

  const onDelete = async () => {
    await mutateAsyncDeletePreference({
      preferredName: primaryTerm,
    });

    await queryClient.invalidateQueries({
      queryKey: [mwVersion, 'preferredTerms'],
    });
  };

  const isLoadingMutation = [
    isLoadingCreatePreference,
    isLoadingDeleteSynonyms,
    isLoadingDeletePreference,
  ].includes(true);

  const isDisabledSubmit =
    !primaryTerm ||
    (!isExisting && currentSynonyms.created.length === 0) ||
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
    onDelete,
  };
};

const defaultCurrentSynonyms = {
  created: [],
  deleted: [],
};
