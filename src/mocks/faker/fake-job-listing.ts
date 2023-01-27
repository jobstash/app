import { faker } from '@faker-js/faker';

import { JobListing } from '~/core/interfaces';

import { fakeJob } from './fake-job';
import { fakeOrg } from './fake-org';

export const fakeJobListing = (): JobListing => {
  const org = fakeOrg();

  return {
    org,
    job: fakeJob(org),
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

// Expose generated data available throughout server-lifetime
// So that we don't generate fake data on every page refresh
// Data lives throught server-lifetime (until next server restart)
export const generatedJobListings = fakeJobListings(12, 24);
