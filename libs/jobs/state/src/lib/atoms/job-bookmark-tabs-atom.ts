import { atom } from 'jotai';

export const JOB_BOOKMARK_TABS = {
  SAVED_JOBS: 'Saved Jobs',
  CUSTOM_LISTS: 'Custom Lists',
} as const;

export type JobBookmarkTab =
  typeof JOB_BOOKMARK_TABS[keyof typeof JOB_BOOKMARK_TABS];

export const jobBookmarkTabsAtom = atom<JobBookmarkTab>(
  JOB_BOOKMARK_TABS.SAVED_JOBS,
);
