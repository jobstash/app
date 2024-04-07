import { atom } from 'jotai';

import { ProjectDetails } from '~/projects/core/schemas';

export const initProjectAtom = atom<ProjectDetails | null>(null);
