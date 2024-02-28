import { atom } from 'jotai';

import { OrgDetails } from '@jobstash/organizations/core';

export const editAliasAtom = atom({
  org: {} as OrgDetails,
  aliases: [] as string[],
  originalAlias: [] as string[],
  isOpen: false,
});
