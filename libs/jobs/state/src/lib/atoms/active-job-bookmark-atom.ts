import { atom } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';

export const activeJobBookmarkAtom = atom<JobPost | null>(null);
