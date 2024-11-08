import { atom } from 'jotai';

import { UpdateApplicantNotePayload } from '@jobstash/shared/core';

export const APPLICANTS_ACTIVE_LIST = {
  ALL: 'all',
  NEW: 'new',
  SHORTLISTED: 'shortlisted',
  ARCHIVED: 'archived',
} as const;

export type ApplicantActiveList =
  typeof APPLICANTS_ACTIVE_LIST[keyof typeof APPLICANTS_ACTIVE_LIST];

export const applicantsActiveListAtom = atom<ApplicantActiveList>(
  APPLICANTS_ACTIVE_LIST.ALL,
);

export const noteUpdatePayloadAtom = atom<UpdateApplicantNotePayload | null>(
  null,
);
