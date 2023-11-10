import { createContext, useContext } from 'react';

import { type PreferredTermsMutFn } from '@jobstash/admin/core';

export interface PreferredTermsFormContextProps {
  primaryTerm: string;
  onChangePrimaryTerm: (_: string) => void;
  synonyms: string[];
  synonymOptions: string[];
  addSynonym: (_: string) => void;
  removeSynonym: (_: string) => void;
  isLoadingMutation: boolean;
  mutateCreatePreference: PreferredTermsMutFn;
  mutateDeletePreference: PreferredTermsMutFn;
  isExisting: boolean;
  currentSynonyms: {
    created: string[];
    deleted: string[];
  };
  clearForm: () => void;
  isSuccess: boolean;
  isDisabledSubmit: boolean;
}

export const PreferredTermsFormContext =
  createContext<PreferredTermsFormContextProps | null>(null);

export const usePreferredTermsFormContext = () => {
  const context = useContext(PreferredTermsFormContext);

  if (!context) {
    throw new Error(
      'usePreferredTermsFormContext must be used within a PreferredTermsFormContextProvider',
    );
  }

  return context;
};
