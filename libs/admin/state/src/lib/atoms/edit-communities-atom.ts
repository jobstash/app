import { atom } from 'jotai';

import { OrgItem } from '@jobstash/admin/core';

export const editCommunitiesAtom = atom({
  org: {} as OrgItem,
  communities: [] as string[],
  isOpen: false,
});
