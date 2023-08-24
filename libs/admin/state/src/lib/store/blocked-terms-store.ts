import { create } from 'zustand';

import { dedupe } from '@jobstash/shared/utils';

interface BlockedTermsState {
  options: string[];
  blockedTerms: string[];
  unblockedTerms: string[];
  initOptions: (allTerms: string[]) => void;
  initBlockedTerms: (blockedTerms: string[]) => void;
  blockTerm: (blockedTerm: string) => void;
}

export const useBlockedTermsStore = create<BlockedTermsState>()((set, get) => ({
  options: [],
  blockedTerms: [],
  unblockedTerms: [],
  initOptions: (options: string[]) => set({ options }),
  initBlockedTerms: (blockedTerms: string[]) => set({ blockedTerms }),
  blockTerm(blockedTerm: string) {
    const { options, unblockedTerms, blockedTerms } = get();

    const newOptions = options.filter((term) => term !== blockedTerm);

    const newUnblockedTerms = unblockedTerms.filter(
      (term) => term !== blockedTerm,
    );

    const newBlockedTerms = [...blockedTerms, blockedTerm];

    set({
      options: dedupe(newOptions),
      unblockedTerms: dedupe(newUnblockedTerms),
      blockedTerms: dedupe(newBlockedTerms),
    });
  },
  unblockTerm(unblockedTerm: string) {
    const { options, unblockedTerms, blockedTerms } = get();

    const newOptions = [...options, unblockedTerm];

    const newBlockedTerms = blockedTerms.filter(
      (term) => term !== unblockedTerm,
    );

    const newUnblockedTerms = [...unblockedTerms, unblockedTerm];

    set({
      options: dedupe(newOptions),
      unblockedTerms: dedupe(newUnblockedTerms),
      blockedTerms: dedupe(newBlockedTerms),
    });
  },
}));
