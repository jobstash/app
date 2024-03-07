import { atom } from 'jotai';

export const jobFiltersSearchParamsAtom = atom<URLSearchParams>(
  new URLSearchParams(),
);
