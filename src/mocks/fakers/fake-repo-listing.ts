import { faker } from '@faker-js/faker';

import type { RepoListing } from '~/core/interfaces';

import { fakeJobs } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProject } from './fake-project';
import { fakeRepo } from './fake-repo';

export const fakeRepoListing = (): RepoListing => {
  const org = fakeOrg();
  const details = fakeRepo();
  const project = fakeProject();
  const jobs = fakeJobs();
  const created = `${faker.datatype.number({ min: 1, max: 6 })} days ago`;

  return {
    details,
    org,
    jobs,
    project,
    created,
  };
};

export const fakeRepoListings = (min = 4, max = 8) =>
  Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeRepoListing());
