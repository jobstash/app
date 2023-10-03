import { create } from 'zustand';

import { AllTagsSlice } from '@jobstash/admin/core';

import { createPreferredTermsSlice } from './preferred-terms-slice';
import { createTagsSlice } from './tags-slice';

export const useTagsStore = create<AllTagsSlice>()((...a) => ({
  ...createTagsSlice(...a),
  ...createPreferredTermsSlice(...a),
}));
