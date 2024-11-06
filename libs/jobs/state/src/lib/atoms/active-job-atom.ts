import { atom } from 'jotai';

import { JobPost } from '@jobstash/shared/core';

export const activeJobAtom = atom<JobPost | null>(null);
export const activeCryptoNativeJobAtom = atom<JobPost | null>(null);
