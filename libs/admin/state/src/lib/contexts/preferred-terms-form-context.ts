import { createContext, useContext } from 'react';

export interface PreferredTermsFormContextProps {
  primaryTerm: string;
  onChangePrimaryTerm: (_: string) => void;
  synonyms: string[];
  synonymOptions: string[];
  addSynonym: (_: string) => void;
  removeSynonym: (_: string) => void;
  isLoadingMutation: boolean;
  isExisting: boolean;
  currentSynonyms: {
    created: string[];
    deleted: string[];
  };
  isDisabledSubmit: boolean;
  onSubmit: () => void;
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
