import { PreferredTerm } from '../../schemas';

export interface PreferredTermsSlice {
  preferredTerms: PreferredTerm[];
  setPreferredTerms: (_: PreferredTerm[]) => void;

  primaryTerm: string;
  onChangePrimaryTerm: (_: string) => void;

  synonyms: string[];
  synonymsOptions: string[];
  addSynonym: (_: string) => void;
  removeSynonym: (_: string) => void;
}
