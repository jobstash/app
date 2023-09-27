import { create } from 'zustand';

import { AllTechnologiesSlice } from '@jobstash/admin/core';

import { createPreferredTermsSlice } from './preferred-terms-slice';
import { createTechnologiesSlice } from './technologies-slice';

export const useTechnologiesStore = create<AllTechnologiesSlice>()((...a) => ({
  ...createTechnologiesSlice(...a),
  ...createPreferredTermsSlice(...a),
}));
