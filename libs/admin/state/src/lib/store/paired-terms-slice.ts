import { type StateCreator } from 'zustand';

import {
  type AllTechnologiesSlice,
  type PairedTermsSlice,
} from '@jobstash/admin/core';

export const createPairedTermsSlice: StateCreator<
  AllTechnologiesSlice,
  [],
  [],
  PairedTermsSlice
> = (set, get) => ({
  pairedTerms: [],
  setPairedTerms: (pairedTerms) => set({ pairedTerms }),

  destinationOptions: [],
  destinationTerms: [],
  addDestinationTerm(term) {
    const { destinationTerms, technologies, origin } = get();

    const newDestinationTerms = [...destinationTerms, term];
    const newDestinationOptions = technologies.filter(
      (term) => !newDestinationTerms.includes(term) && term !== origin,
    );

    set({
      destinationTerms: newDestinationTerms,
      destinationOptions: newDestinationOptions,
    });
  },
  removeDestinationTerm(term) {
    const { destinationTerms, technologies, origin } = get();

    const newDestinationTerms = destinationTerms.filter(
      (destinationTerm) => destinationTerm !== term,
    );
    const newDestinationOptions = technologies.filter(
      (term) => !newDestinationTerms.includes(term) && term !== origin,
    );

    set({
      destinationTerms: newDestinationTerms,
      destinationOptions: newDestinationOptions,
    });
  },

  origin: '',
  onChangeOrigin(origin) {
    const { technologies, pairedTerms } = get();

    const pairedTerm = pairedTerms.find(
      (pairedTerm) => pairedTerm.technology === origin,
    );

    const destinationTerms = pairedTerm?.pairings ?? [];

    const destinationOptions = technologies.filter(
      (term) => !destinationTerms.includes(term) && term !== origin,
    );

    set({ origin, destinationTerms, destinationOptions });
  },
});
