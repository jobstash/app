import { atom } from 'jotai';

import { UpdateNotePayload } from './types';

export const noteUpdatePayloadAtom = atom<UpdateNotePayload | null>(null);
