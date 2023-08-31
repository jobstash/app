import { StateCreator } from 'zustand';

import {
  type AllTechnologiesSlice,
  TechnologiesSlice,
} from '@jobstash/admin/core';

export const createTechnologiesSlice: StateCreator<
  AllTechnologiesSlice,
  [],
  [],
  TechnologiesSlice
> = (set) => ({
  technologies: [],
  setTechnologies: (technologies) => set({ technologies }),
});
