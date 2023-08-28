import { create } from 'zustand';

interface PairedTermsState {
  allTerms: string[];
  setAllTerms: (_: string[]) => void;

  origins: string[];
}

export const usePairedTermsStore = create<PairedTermsState>((set) => ({
  origins: [],

  allTerms: [],
  setAllTerms: (allTerms) => set({ allTerms }),
}));
