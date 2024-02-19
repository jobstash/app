import { atom } from 'jotai';

export const pickRoleSectionAtom = atom<'org' | 'dev' | null>(null);
