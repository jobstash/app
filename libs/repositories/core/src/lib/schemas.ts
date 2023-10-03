import myzod from 'myzod';

import {
  orgInfoSchema,
  repositoryInfoSchema,
  tagSchema,
} from '@jobstash/shared/core';

export const repositoryDetailsSchema = myzod.intersection(
  repositoryInfoSchema,
  myzod.object({
    org: orgInfoSchema,
    tags: myzod.array(tagSchema),
  }),
);
