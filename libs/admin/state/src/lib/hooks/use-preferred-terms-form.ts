import { useMemo, useState } from 'react';

import { usePreferredTermsContext } from '../contexts/preferred-terms-context';
import { PreferredTermsFormContextProps } from '../contexts/preferred-terms-form-context';

import { useCreatePreferenceMutation } from './use-create-preference-mutation';
import { useDeletePreferenceMutation } from './use-delete-preference-mutation';
import { useDeleteSynonymsMutation } from './use-delete-synonyms-mutation';

interface SynonymsState {
  created: string[];
  deleted: string[];
}

const DEFAULT_SYNONYMS_STATE: SynonymsState = {
  created: [],
  deleted: [],
};

export const usePreferredTermsForm = (
  initPrimaryTerm: string,
  initSynonyms: string[],
): PreferredTermsFormContextProps => {
  const { primaryTermOptions } = usePreferredTermsContext();

  const [primaryTerm, setPrimaryTerm] = useState(initPrimaryTerm ?? '');
  const onChangePrimaryTerm = (v: string) => setPrimaryTerm(v);

  const [synonymsState, setSynonymsState] = useState<SynonymsState>(
    DEFAULT_SYNONYMS_STATE,
  );
  const { created, deleted } = synonymsState;

  const synonyms = useMemo(
    () => [...initSynonyms, ...created].filter((s) => !deleted.includes(s)),
    [created, deleted, initSynonyms],
  );

  const synonymOptions = useMemo(
    () =>
      primaryTermOptions.filter(
        (t) => !synonyms.includes(t.name) && t.name !== primaryTerm,
      ),
    [primaryTerm, primaryTermOptions, synonyms],
  );

  const addSynonym = (term: string) => {
    setSynonymsState((prev) => ({
      created: [
        ...prev.created,
        ...(initSynonyms.includes(term) ? [] : [term]),
      ],
      deleted: prev.deleted.filter((s) => s !== term),
    }));
  };

  const removeSynonym = (term: string) => {
    setSynonymsState((prev) => ({
      created: prev.created.filter((s) => s !== term),
      deleted: initSynonyms.includes(term)
        ? [...prev.deleted, term]
        : prev.deleted,
    }));
  };

  const clearForm = () => {
    if (!initPrimaryTerm) setPrimaryTerm('');
    setSynonymsState(DEFAULT_SYNONYMS_STATE);
  };

  const { isLoadingDeletePreference, mutateAsyncDeletePreference } =
    useDeletePreferenceMutation();

  const { isLoadingCreatePreference, mutateAsyncCreatePreference } =
    useCreatePreferenceMutation();

  const { isLoadingDeleteSynonyms, mutateAsyncDeleteSynonyms } =
    useDeleteSynonymsMutation();

  const isLoading = [
    isLoadingDeletePreference,
    isLoadingCreatePreference,
    isLoadingDeleteSynonyms,
  ].some(Boolean);

  return {
    primaryTerm,
    onChangePrimaryTerm,
    synonyms,
    synonymOptions,
    synonymsState,
    addSynonym,
    removeSynonym,
    clearForm,
    initPrimaryTerm,
    initSynonyms,
    isLoading,
    mutateAsyncDeletePreference,
    mutateAsyncCreatePreference,
    mutateAsyncDeleteSynonyms,
  };
};
