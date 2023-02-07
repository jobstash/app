import { atom } from 'jotai';

import type { Listing } from '~/core/interfaces';

export const activeListingAtom = atom<Listing | null>(null);
