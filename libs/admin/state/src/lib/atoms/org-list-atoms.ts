import { atom } from 'jotai';

import { OrgRowItem } from '@jobstash/admin/core';

export const orgListPastaStringAtom = atom<string>('');

export const orgListIsFocusedAtom = atom<boolean>(false);

export const orgUpdateRowPayloadAtom = atom<OrgRowItem | null>(null);
