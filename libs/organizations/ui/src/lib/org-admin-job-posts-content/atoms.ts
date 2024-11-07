import { atom } from 'jotai';

import { OrgJobItem } from '@jobstash/organizations/core';

type EditModalAtom = {
  isOpen: boolean;
  orgJob: OrgJobItem | null;
};
export const editModalAtom = atom<EditModalAtom>({
  isOpen: false,
  orgJob: null,
});

export const EDIT_ACTIVE_TABS = {
  MAIN: 'Main',
  DETAILS: 'Details',
  SPECIFICATIONS: 'Specifications',
  COMPENSATION: 'Compensation',
  // SKILLS: 'Skills',
} as const;

export type EditActiveTab =
  typeof EDIT_ACTIVE_TABS[keyof typeof EDIT_ACTIVE_TABS];

export const editActiveTabAtom = atom<EditActiveTab>(EDIT_ACTIVE_TABS.MAIN);
