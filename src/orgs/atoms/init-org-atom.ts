import { atom } from 'jotai';

import { OrgDetails } from '~/orgs/core/schemas';

export const initOrgAtom = atom<OrgDetails | null>(null);
