import { atom } from 'jotai';

import { OrgListItem } from '~/orgs/core/schemas';

export const initOrgAtom = atom<OrgListItem | null>(null);
