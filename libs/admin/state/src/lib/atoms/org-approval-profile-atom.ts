import { atom } from 'jotai';

import { OrgProfileInfo } from '@jobstash/profile/core';

export const orgApprovalProfileAtom = atom({
  org: {} as OrgProfileInfo,
  isOpen: false,
});
