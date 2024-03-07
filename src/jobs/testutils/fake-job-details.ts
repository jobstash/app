import { mergeObjects } from '~/shared/utils/merge-objects';

import { fakeJobInfo } from '~/shared/testutils/fake-job-info';
import { fakeTags } from '~/shared/testutils/fake-tags';

import { JobDetails } from '~/jobs/core/schemas';

import { fakeJobOrg } from './fake-job-org';

export const fakeJobDetails = (override?: Partial<JobDetails>): JobDetails => {
  const result = {
    ...fakeJobInfo(),
    organization: fakeJobOrg(),
    tags: fakeTags(),
  };

  if (override) return mergeObjects(result, override);

  return result;
};
