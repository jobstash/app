import { StateCreator } from 'zustand';

import { type AllTagsSlice, PreferredTermsSlice } from '@jobstash/admin/core';

export const createPreferredTermsSlice: StateCreator<
  AllTagsSlice,
  [],
  [],
  PreferredTermsSlice
> = (set, get) => ({
  preferredTerms: [],
  setPreferredTerms: (preferredTerms) => set({ preferredTerms }),

  primaryTerm: '',
  onChangePrimaryTerm(primaryTerm) {
    const { tags, preferredTerms } = get();

    const synonym = preferredTerms.find((t) => t.tag === primaryTerm);
    const synonyms = synonym?.synoynms.map((t) => t.name) ?? [];
    const synonymsOptions = tags.filter(
      (t) => !synonyms.includes(t) && t !== primaryTerm,
    );

    set({ primaryTerm, synonyms, synonymsOptions });
  },

  synonyms: [],
  synonymsOptions: [],
  addSynonym(term) {
    const { synonyms: prevSynonyms, tags, primaryTerm } = get();

    const synonyms = [...prevSynonyms, term];
    const synonymsOptions = tags.filter(
      (t) => !synonyms.includes(t) && t !== primaryTerm,
    );

    set({
      synonyms,
      synonymsOptions,
    });
  },
  removeSynonym(term) {
    const { synonyms: prevSynonyms, tags, primaryTerm } = get();

    const synonyms = prevSynonyms.filter((t) => t !== term);
    const synonymsOptions = tags.filter(
      (t) => !synonyms.includes(t) && t !== primaryTerm,
    );

    set({ synonyms, synonymsOptions });
  },
});
