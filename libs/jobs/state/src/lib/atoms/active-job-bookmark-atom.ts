import { atom } from 'jotai';

import { JobPost } from '@jobstash/shared/core';

export const activeJobBookmarkAtom = atom<JobPost | null>(null);
