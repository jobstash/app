import myzod from 'myzod';

import {
  orgInfoSchema,
  repositoryInfoSchema,
  technologySchema,
} from '@jobstash/shared/core';

export const repositoryDetailsSchema = myzod.intersection(
  repositoryInfoSchema,
  myzod.object({
    org: orgInfoSchema,
    technologies: myzod.array(technologySchema),
  }),
);
