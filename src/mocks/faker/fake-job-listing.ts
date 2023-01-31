import { faker } from '@faker-js/faker';

import type { JobListing } from '~/core/interfaces';

import { fakeCompetitors } from './fake-competitors';
import { fakeJob } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProject } from './fake-project';
import { fakeRepos } from './fake-repo';

export const fakeJobListing = (): JobListing => {
  const org = fakeOrg();
  const jobs = [fakeJob(org)]; // One element for job-listing
  const project = fakeProject();
  const repositories = fakeRepos(org, 2, 5);
  const competitors = fakeCompetitors();

  return {
    org,
    jobs,
    project,
    competitors,
    repositories,
  };
};

export const fakeJobListings = (min = 3, max = 6): JobListing[] => {
  const length = faker.datatype.number({ min, max });

  return Array.from({ length })
    .fill(0)
    .map(() => fakeJobListing());
};
