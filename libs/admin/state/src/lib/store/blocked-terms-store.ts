import { create } from 'zustand';

import { dedupe } from '@jobstash/shared/utils';

interface BlockedTermsState {
  // Computed value
  options: string[];

  // All existing terms
  allTerms: string[];
  setAllTerms: (_: string[]) => void;

  // Terms that are blocked by backend
  fetchedBlockedTerms: string[];
  setFetchedBlockedTerms: (_: string[]) => void;

  // Blocked terms state
  blockedTerms: string[];
  blockTerm: (term: string) => void;
  onSuccessBlockTerms: (technologyNameList: string[]) => void;

  // Unblocked terms state
  unblockedTerms: string[];
  unblockTerm: (term: string) => void;
  onSuccessUnblockTerms: (technologyNameList: string[]) => void;
}

export const useBlockedTermsStore = create<BlockedTermsState>()((set, get) => ({
  options: [],

  allTerms: [],
  setAllTerms: (allTerms: string[]) => set({ allTerms, options: allTerms }),

  fetchedBlockedTerms: [],
  setFetchedBlockedTerms(fetchedBlockedTerms: string[]) {
    set({
      fetchedBlockedTerms,
      options: get().allTerms.filter(
        (term) => !fetchedBlockedTerms.includes(term),
      ),
    });
  },

  blockedTerms: [],
  blockTerm(term) {
    const { allTerms, fetchedBlockedTerms, blockedTerms } = get();

    const newBlockedTerms = [...blockedTerms, term];

    const newOptions = allTerms.filter(
      (term) =>
        !newBlockedTerms.includes(term) && !fetchedBlockedTerms.includes(term),
    );

    set({
      options: dedupe(newOptions),
      blockedTerms: dedupe(newBlockedTerms),
    });
  },
  onSuccessBlockTerms(blockedTerms: string[]) {
    const { allTerms, fetchedBlockedTerms } = get();

    const newOptions = allTerms.filter(
      (term) =>
        !blockedTerms.includes(term) && !fetchedBlockedTerms.includes(term),
    );

    set({
      options: dedupe(newOptions),
      blockedTerms: [],
    });
  },

  unblockedTerms: [],
  unblockTerm(unblockedTerm: string) {
    const { allTerms, unblockedTerms, fetchedBlockedTerms, blockedTerms } =
      get();

    const newUnblockedTerms = [...unblockedTerms, unblockedTerm];
    const newBlockedTerms = blockedTerms.filter(
      (term) => term !== unblockedTerm,
    );

    const newOptions = allTerms.filter(
      (term) =>
        (!blockedTerms.includes(term) && !fetchedBlockedTerms.includes(term)) ||
        newUnblockedTerms.includes(term),
    );

    set({
      options: dedupe(newOptions),
      blockedTerms: dedupe(newBlockedTerms),
      unblockedTerms: dedupe(newUnblockedTerms),
    });
  },
  onSuccessUnblockTerms(unblockedTerms: string[]) {
    const { allTerms, fetchedBlockedTerms } = get();

    const newOptions = [
      ...allTerms.filter((term) => !fetchedBlockedTerms.includes(term)),
      ...unblockedTerms,
    ];

    set({
      options: dedupe(newOptions),
      unblockedTerms: [],
    });
  },
}));
