import { atom } from 'jotai';

import { ProfileGotItCardStatus } from '@jobstash/profile/core';

export const showGotItCardAtom = atom<ProfileGotItCardStatus>({
  profile: false,
  repositories: false,
  reviews: false,
});
