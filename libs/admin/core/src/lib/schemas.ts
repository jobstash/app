import myzod from 'myzod';

import { technologySchema } from '@jobstash/shared/core';

export const godmodeTechnologiesSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.array(technologySchema),
});

export const godmodeBlockedTechnologiesSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.array(technologySchema),
});
