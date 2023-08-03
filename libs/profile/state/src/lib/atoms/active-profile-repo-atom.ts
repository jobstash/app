import { atom } from 'jotai';

import { type ProfileRepo } from '@jobstash/profile/core';

export const activeProfileRepoAtom = atom<ProfileRepo | null>(null);
