import { atom } from 'jotai';

import { JobPost } from '../core/interfaces';

export const activeJobPostAtom = atom<JobPost | null>(null);
