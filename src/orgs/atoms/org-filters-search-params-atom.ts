import { atom } from 'jotai';

export const orgFiltersSearchParamsAtom = atom<URLSearchParams>(
  new URLSearchParams(),
);
