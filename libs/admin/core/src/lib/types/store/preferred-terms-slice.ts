import { PreferredTerm } from '../../schemas';

export interface PreferredTermsSlice {
  newPrimaryTerm: string;
  newSynonymList: string[];

  preferredTerms: PreferredTerm[];
  setPreferredTerms: (_: PreferredTerm[]) => void;
}
