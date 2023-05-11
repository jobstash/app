import { atom } from 'jotai';

import type { Job } from '../../jobs/core/types';

export const activeJobAtom = atom<Job | null>(null);
