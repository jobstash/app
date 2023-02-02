import { faker } from '@faker-js/faker';

import type { Listing } from '~/core/interfaces';

import { fakeCompetitors } from './fake-competitors';
import { fakeJob } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProject } from './fake-project';
import { fakeRepos } from './fake-repo';

export const fakeJobListing = (): Listing => {
  const org = fakeOrg();
  const jobs = [fakeJob(org)]; // One element for job-listing
  const projects = fakeProject();
  const repositories = fakeRepos(org, 2, 5);
  const competitors = fakeCompetitors();

  return {
    org,
    jobs,
    projects,
    competitors,
    repositories,
  };
};

export const fakeJobListings = (min = 3, max = 6): Listing[] => {
  const length = faker.datatype.number({ min, max });

  return Array.from({ length })
    .fill(0)
    .map(() => fakeJobListing());
};
