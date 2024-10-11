import { atom } from 'jotai';

import { OrgItem } from '@jobstash/admin/core';

export const selectedOrgAtom = atom<(OrgItem & { value: string }) | null>(null);
