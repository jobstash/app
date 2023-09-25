import { StateCreator } from 'zustand';

import {
  type AllTechnologiesSlice,
  PreferredTermsSlice,
} from '@jobstash/admin/core';

export const createPreferredTermsSlice: StateCreator<
  AllTechnologiesSlice,
  [],
  [],
  PreferredTermsSlice
> = (set, get) => ({
  preferredTerms: [],
  setPreferredTerms: (preferredTerms) => set({ preferredTerms }),

  primaryTerm: '',
  onChangePrimaryTerm(primaryTerm) {
    const { technologies, preferredTerms } = get();

    const synonym = preferredTerms.find((t) => t.technology === primaryTerm);
    const synonyms = synonym?.synoynms.map((t) => t.name) ?? [];
    const synonymsOptions = technologies.filter(
      (t) => !synonyms.includes(t) && t !== primaryTerm,
    );

    set({ primaryTerm, synonyms, synonymsOptions });
  },

  synonyms: [],
  synonymsOptions: [],
  addSynonym(term) {
    const { synonyms: prevSynonyms, technologies, primaryTerm } = get();

    const synonyms = [...prevSynonyms, term];
    const synonymsOptions = technologies.filter(
      (t) => !synonyms.includes(t) && t !== primaryTerm,
    );

    set({
      synonyms,
      synonymsOptions,
    });
  },
  removeSynonym(term) {
    const { synonyms: prevSynonyms, technologies, primaryTerm } = get();

    const synonyms = prevSynonyms.filter((t) => t !== term);
    const synonymsOptions = technologies.filter(
      (t) => !synonyms.includes(t) && t !== primaryTerm,
    );

    set({ synonyms, synonymsOptions });
  },
});
