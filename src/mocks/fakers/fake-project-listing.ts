import { faker } from '@faker-js/faker';

import type { ProjectListing } from '~/core/interfaces';

import { fakeJobs } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProject, fakeProjects } from './fake-project';
import { fakeRepos } from './fake-repo';

export const fakeProjectListing = (): ProjectListing => {
  const details = fakeProject();
  const org = fakeOrg();
  const jobs = fakeJobs();
  const repos = fakeRepos();
  const competitors = fakeProjects().filter(
    (competitor) => competitor.name !== details.name,
  );
  const created = `${faker.datatype.number({ min: 1, max: 6 })} days ago`;

  return {
    details,
    org,
    jobs,
    repos,
    competitors,
    created,
  };
};

export const fakeProjectListings = (min = 4, max = 8) =>
  Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeProjectListing());
