import { atom } from 'jotai';

import { OrgListItem } from '@jobstash/organizations/core';

export const editCommunitiesAtom = atom({
  org: {} as OrgListItem,
  communities: [] as string[],
  isOpen: false,
});
