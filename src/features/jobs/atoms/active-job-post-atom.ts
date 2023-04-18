import { atom } from 'jotai';

import { Job } from '../core/interfaces';

export const activeJobPostAtom = atom<Job | null>(null);
