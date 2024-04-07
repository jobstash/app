import { atom } from 'jotai';

export const projectFiltersSearchParamsAtom = atom<URLSearchParams>(
  new URLSearchParams(),
);
