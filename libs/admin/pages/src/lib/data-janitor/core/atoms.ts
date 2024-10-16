import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

import { OrgImportItem, OrgImportStatus } from '../core/types';

export const orgImportTabAtom = atom<OrgImportStatus>('all');
export const orgManageTabAtom = atom<'details' | 'projects'>('details');
export const orgManageFieldsAtom = atom<'details' | 'socials'>('details');

export const ORG_IMPORT_ITEMS_KEY = 'org-import-items';
const ORG_IMPORT_ITEMS_DEFAULT_VALUE: OrgImportItem[] = [];

export const orgImportItemsAtom = atomWithStorage<OrgImportItem[]>(
  ORG_IMPORT_ITEMS_KEY,
  ORG_IMPORT_ITEMS_DEFAULT_VALUE,
  createJSONStorage(() => localStorage),
);
