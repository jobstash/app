import { atom } from 'jotai';

import type { Post } from '~/core/interfaces';

export const activePostAtom = atom<Post | null>(null);
