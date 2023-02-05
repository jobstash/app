import { faker } from '@faker-js/faker';

import type { OrgListing } from '~/core/interfaces';

import { fakeJobs } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProjects } from './fake-project';
import { fakeRepos } from './fake-repo';

export const fakeOrgListing = (): OrgListing => {
  const details = fakeOrg();
  const jobs = fakeJobs();
  const projects = fakeProjects();
  const repos = fakeRepos();
  const created = `${faker.datatype.number({ min: 1, max: 6 })} days ago`;

  return {
    details,
    jobs,
    projects,
    repos,
    created,
  };
};

export const fakeOrgListings = (min = 4, max = 8) =>
  Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeOrgListing());
