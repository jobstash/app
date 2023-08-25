import myzod from 'myzod';

import { technologySchema } from '@jobstash/shared/core';

export const godmodeTechnologiesSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.array(technologySchema),
});

export const godmodeBlockedTechnologiesResponseSchema = myzod.object({
  success: myzod.boolean(),
  message: myzod.string().min(1),
  data: myzod.array(technologySchema),
});

export const godmodeBlockedTermsResponseSchema = myzod
  .object({
    success: myzod.boolean(),
    message: myzod.string().min(1).optional(),
  })
  .allowUnknownKeys(true);

export const godmodeBlockedTermsPayloadSchema = myzod.object({
  technologyNameList: myzod.array(myzod.string().min(1)),
  creatorWallet: myzod.string().min(1),
});
