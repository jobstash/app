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
> = (set) => ({
  newPrimaryTerm: '',
  newSynonymList: [],
  preferredTerms: [],
  setPreferredTerms: (preferredTerms) => set({ preferredTerms }),
});
