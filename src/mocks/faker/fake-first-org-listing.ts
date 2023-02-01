import { ORG_UNISWAP_LABS } from '~/core/constants';
import type { Org, OrgListing } from '~/core/interfaces';

import { fakeCompetitors } from './fake-competitors';
import { fakeJobs } from './fake-job';
import { fakeOrg, getOrgLocation } from './fake-org';
import { fakeProject } from './fake-project';
import { fakeRepos } from './fake-repo';

export const fakeFirstOrgListing = (): OrgListing => {
  const org: Org = {
    ...fakeOrg(),
    name: ORG_UNISWAP_LABS,
    avatar: `/org/${ORG_UNISWAP_LABS}.svg`,
    location: getOrgLocation(ORG_UNISWAP_LABS),
  };

  const jobs = fakeJobs();
  const project = fakeProject();
  const competitors = fakeCompetitors();
  const repositories = fakeRepos(org);

  return {
    org,
    jobs,
    project,
    competitors,
    repositories,
  };
};
