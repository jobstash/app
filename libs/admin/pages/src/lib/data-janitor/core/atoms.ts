import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

import { ImportItem, ImportStatus } from '../core/types';

export const orgImportTabAtom = atom<ImportStatus>('all');
export type OrgManageTab =
  | 'details'
  | 'description'
  | 'websites'
  | 'grants'
  | 'socials'
  | 'jobsites'
  | 'projects';
export const orgManageTabAtom = atom<OrgManageTab>('details');

export const orgImportItemsAtom = atomWithStorage<ImportItem[]>(
  'org-import-items',
  [],
  createJSONStorage(() => localStorage),
);

export type ProjectManageTab =
  | 'details'
  | 'org'
  | 'financials'
  | 'websites'
  | 'socials'
  | 'tokens'
  | 'defillama';
export const projectManageTabAtom = atom<ProjectManageTab>('details');

export const projectImportTabAtom = atom<ImportStatus>('all');

export const projectImportItemsAtom = atomWithStorage<ImportItem[]>(
  'project-import-items',
  [],
  createJSONStorage(() => localStorage),
);
