import { atom } from 'jotai';

export const activeListAtom = atom<'all' | 'new' | 'shortlisted' | 'archived'>(
  'all',
);
