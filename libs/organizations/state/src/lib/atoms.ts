import { atom } from 'jotai';

import { JobPost } from '@jobstash/jobs/core';

export const activeOrgIdAtom = atom<string | null>(null);
export const orgCountAtom = atom<number | null>(null);
export const orgsPrevLinkAtom = atom<string | null>(null);

export const ORG_ADMIN_TABS = {
  ORGANIZATION: 'Organization',
  JOBS: 'Job Posts',
  // PROJECTS: 'Related Projects',
} as const;

export type OrgAdminActiveTab =
  typeof ORG_ADMIN_TABS[keyof typeof ORG_ADMIN_TABS];

export const orgAdminActiveTabAtom = atom<OrgAdminActiveTab>(
  ORG_ADMIN_TABS.ORGANIZATION,
);

export const activeOrgJobAtom = atom<JobPost | null>(null);
