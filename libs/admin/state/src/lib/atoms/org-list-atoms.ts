import { atom } from 'jotai';

import { OrgEditPayload } from '@jobstash/admin/core';

export const orgListPastaStringAtom = atom<string>('');

export const orgListIsFocusedAtom = atom<boolean>(false);

export const orgEditRowPayloadAtom = atom<OrgEditPayload | null>(null);
