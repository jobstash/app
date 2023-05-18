import { atom } from 'jotai';

import type { JobListResult } from '../../jobs/core/types';

export const activeJobAtom = atom<JobListResult | null>(null);
