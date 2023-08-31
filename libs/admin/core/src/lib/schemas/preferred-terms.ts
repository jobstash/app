import myzod, { type Infer } from 'myzod';

import { technologySchema } from '@jobstash/shared/core';

export const preferredTermSchema = myzod.object({
  technology: myzod.string(),
  synoynms: myzod.array(technologySchema),
});

export const preferredTermsResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.array(preferredTermSchema),
});

export type PreferredTerm = Infer<typeof preferredTermSchema>;
export type PreferredTermsResponse = Infer<typeof preferredTermsResponseSchema>;
