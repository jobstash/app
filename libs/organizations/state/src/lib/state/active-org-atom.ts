import { atom } from 'jotai';

import { OrgPost } from '@jobstash/organizations/core';

export const activeOrgAtom = atom<OrgPost | null>(null);
