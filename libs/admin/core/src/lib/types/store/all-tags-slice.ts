import { type PreferredTermsSlice } from './preferred-terms-slice';
import { type TagsSlice } from './tags-slice';

export type AllTagsSlice = TagsSlice & PreferredTermsSlice;
