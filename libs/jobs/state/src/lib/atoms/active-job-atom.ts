import { atom } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';

export const activeJobAtom = atom<JobPost | null>(null);
