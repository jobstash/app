import { atom } from 'jotai';

import { UpdateProjectPayload } from '@jobstash/admin/core';

export const projectsGridPastaStringAtom = atom<string>('');
export const projectsGridIsFocusedAtom = atom<boolean>(false);
export const projectsGridEditRowPayloadAtom = atom<{
  id: string;
  payload: UpdateProjectPayload;
} | null>(null);
