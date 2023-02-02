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
  const jobListings: Listing[] = [];

  for (let i = 0; i < faker.datatype.number({ min, max }); i++) {
    jobListings.push(fakeJobListing());
  }

  return jobListings;
};
