import { createContext, useContext } from 'react';

import { UseMutateAsyncFunction } from '@tanstack/react-query';

import {
  DeletePreferencePayload,
  PreferredTermsPayload,
} from '@jobstash/admin/core';
import { MessageResponse, Tag } from '@jobstash/shared/core';

export interface PreferredTermsFormContextProps {
  primaryTerm: string;
  onChangePrimaryTerm: (_: string) => void;
  synonyms: string[];
  synonymOptions: Tag[];
  synonymsState: {
    created: string[];
    deleted: string[];
  };
  addSynonym: (_: string) => void;
  removeSynonym: (_: string) => void;
  clearForm: () => void;
  initPrimaryTerm: string;
  initSynonyms: string[];
  isLoading: boolean;
  mutateAsyncDeletePreference: UseMutateAsyncFunction<
    MessageResponse,
    Error,
    DeletePreferencePayload
  >;
  mutateAsyncCreatePreference: UseMutateAsyncFunction<
    MessageResponse,
    Error,
    PreferredTermsPayload
  >;
  mutateAsyncDeleteSynonyms: UseMutateAsyncFunction<
    MessageResponse,
    Error,
    PreferredTermsPayload
  >;
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
