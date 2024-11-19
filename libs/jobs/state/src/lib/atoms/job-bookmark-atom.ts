import { atom } from 'jotai';

import { JobPost } from '@jobstash/shared/core';

interface State {
  isOpen: boolean;
  jobPost: JobPost | null;
}

export const jobBookmarkAtom = atom<State>({
  isOpen: false,
  jobPost: null,
});
