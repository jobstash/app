import type { Listing } from '~/core/interfaces';

import { fakeCompetitors } from './fake-competitors';
import { fakeJobs } from './fake-job';
import { fakeOrg } from './fake-org';
import { fakeProject } from './fake-project';
import { fakeRepos } from './fake-repo';

export const fakeListing = (): Listing => {
  const org = fakeOrg();
  const jobs = fakeJobs();
  const projects = fakeProject();
  const competitors = fakeCompetitors();
  const repositories = fakeRepos(org);

  return {
    org,
    jobs,
    projects,
    competitors,
    repositories,
  };
};
