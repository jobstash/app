import { create } from 'zustand';

import { GodmodePairedTerm } from '@jobstash/admin/core';

interface PairedTermsState {
  allTerms: string[];
  setAllTerms: (_: string[]) => void;

  pairedTerms: GodmodePairedTerm[];
  setPairedTerms: (_: GodmodePairedTerm[]) => void;

  destinationOptions: string[];
  destinationTerms: string[];
  addDestinationTerm: (_: string) => void;
  removeDestinationTerm: (_: string) => void;

  origin: string;
  onChangeOrigin: (_: string) => void;
}

export const usePairedTermsStore = create<PairedTermsState>((set, get) => ({
  allTerms: [],
  setAllTerms: (allTerms) => set({ allTerms }),

  pairedTerms: [],
  setPairedTerms: (pairedTerms) => set({ pairedTerms }),

  destinationOptions: [],
  destinationTerms: [],
  addDestinationTerm(term) {
    const { destinationTerms, allTerms, origin } = get();

    const newDestinationTerms = [...destinationTerms, term];
    const newDestinationOptions = allTerms.filter(
      (term) => !newDestinationTerms.includes(term) && term !== origin,
    );

    set({
      destinationTerms: newDestinationTerms,
      destinationOptions: newDestinationOptions,
    });
  },
  removeDestinationTerm(term) {
    const { destinationTerms, allTerms, origin } = get();

    const newDestinationTerms = destinationTerms.filter(
      (destinationTerm) => destinationTerm !== term,
    );
    const newDestinationOptions = allTerms.filter(
      (term) => !newDestinationTerms.includes(term) && term !== origin,
    );

    set({
      destinationTerms: newDestinationTerms,
      destinationOptions: newDestinationOptions,
    });
  },

  origin: '',
  onChangeOrigin(origin) {
    const { allTerms, pairedTerms } = get();

    const pairedTerm = pairedTerms.find(
      (pairedTerm) => pairedTerm.technology === origin,
    );

    const destinationTerms = pairedTerm?.pairings ?? [];

    const destinationOptions = allTerms.filter(
      (term) => !destinationTerms.includes(term) && term !== origin,
    );

    set({ origin, destinationTerms, destinationOptions });
  },
}));
