import { faker } from '@faker-js/faker';

import { JobListing } from '~/core/interfaces';

import { fakeJob } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProject } from './fake-project';

export const fakeJobListing = (): JobListing => {
  const org = fakeOrg();
  const job = fakeJob(org);
  const project = fakeProject();

  return {
    org,
    job,
    project,
    competitors: null,
    repositories: null,
  };
};

export const fakeJobListings = (min = 3, max = 6): JobListing[] => {
  // // Always generate the same sets of job-listings
  // // to avoid regenerating new data on refresh
  // faker.seed(69);
  const length = faker.datatype.number({ min, max });

  return Array.from({ length })
    .fill(0)
    .map(() => fakeJobListing());
};
