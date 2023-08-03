import { atom } from 'jotai';

import { type ProfileOrgReview } from '@jobstash/profile/core';

export const activeProfileOrgReviewAtom = atom<ProfileOrgReview | null>(null);
