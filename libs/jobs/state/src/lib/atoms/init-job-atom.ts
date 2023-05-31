import { atom } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';

export const initJobAtom = atom<JobPost | null>(null);
