import { atom } from 'jotai';

import { TAB_SEGMENT } from '@jobstash/shared/core';

type Tab = typeof TAB_SEGMENT[keyof typeof TAB_SEGMENT];
export const activeJobBookmarkTabAtom = atom<Tab>(TAB_SEGMENT.details);
