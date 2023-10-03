import { StateCreator } from 'zustand';

import { type AllTagsSlice, TagsSlice } from '@jobstash/admin/core';

export const createTagsSlice: StateCreator<AllTagsSlice, [], [], TagsSlice> = (
  set,
) => ({
  tags: [],
  setTags: (technologies) => set({ tags: technologies }),
});
