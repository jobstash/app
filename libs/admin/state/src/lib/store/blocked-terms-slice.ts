import { type StateCreator } from 'zustand';

import {
  type AllTechnologiesSlice,
  type BlockedTermsSlice,
} from '@jobstash/admin/core';
import { dedupe } from '@jobstash/shared/utils';

export const createBlockedTermsSlice: StateCreator<
  AllTechnologiesSlice,
  [],
  [],
  BlockedTermsSlice
> = (set, get) => ({
  options: [],

  fetchedBlockedTerms: [],
  setFetchedBlockedTerms(fetchedBlockedTerms: string[]) {
    set({
      fetchedBlockedTerms,
      options: get().technologies.filter(
        (term) => !fetchedBlockedTerms.includes(term),
      ),
    });
  },

  blockedTerms: [],
  blockTerm(term) {
    const { technologies, fetchedBlockedTerms, blockedTerms } = get();

    const newBlockedTerms = [...blockedTerms, term];

    const newOptions = technologies.filter(
      (term) =>
        !newBlockedTerms.includes(term) && !fetchedBlockedTerms.includes(term),
    );

    set({
      options: dedupe(newOptions),
      blockedTerms: dedupe(newBlockedTerms),
    });
  },
  onSuccessBlockTerms(blockedTerms: string[]) {
    const { technologies, fetchedBlockedTerms } = get();

    const newOptions = technologies.filter(
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
    const { technologies, unblockedTerms, fetchedBlockedTerms, blockedTerms } =
      get();

    const newUnblockedTerms = [...unblockedTerms, unblockedTerm];
    const newBlockedTerms = blockedTerms.filter(
      (term) => term !== unblockedTerm,
    );

    const newOptions = technologies.filter(
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
    const { technologies, fetchedBlockedTerms } = get();

    const newOptions = [
      ...technologies.filter((term) => !fetchedBlockedTerms.includes(term)),
      ...unblockedTerms,
    ];

    set({
      options: dedupe(newOptions),
      unblockedTerms: [],
    });
  },
});
