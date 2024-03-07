import { atom } from 'jotai';

import { JobDetails } from '~/jobs/core/schemas';

export const initJobAtom = atom<JobDetails | null>(null);
