import { atom } from 'jotai';

export const pickRoleSectionAtom = atom<'org' | 'dev' | 'email-done' | null>(
  null,
);
