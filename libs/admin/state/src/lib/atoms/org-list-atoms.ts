import { atom } from 'jotai';

import { OrgItem } from '@jobstash/admin/core';

export const orgListPastaStringAtom = atom<string>('');

export const orgListIsFocusedAtom = atom<boolean>(false);

export const orgEditRowPayloadAtom = atom<OrgItem | null>(null);
