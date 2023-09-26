import { type BlockedTermsSlice } from './blocked-terms-slice';
import { type PreferredTermsSlice } from './preferred-terms-slice';
import { type TechnologiesSlice } from './technologies-slice';

export type AllTechnologiesSlice = TechnologiesSlice &
  PreferredTermsSlice &
  BlockedTermsSlice;
