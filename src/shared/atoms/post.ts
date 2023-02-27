import { atom } from 'jotai';

import type { Post } from '~/shared/core/interfaces';

export const activePostAtom = atom<Post | null>(null);
