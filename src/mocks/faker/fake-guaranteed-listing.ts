import { ORG_UNISWAP_LABS } from '~/core/constants';
import type { Listing, Org } from '~/core/interfaces';

import { fakeCompetitors } from './fake-competitors';
import { fakeJob } from './fake-job';
import { fakeOrg, getOrgLocation } from './fake-org';
import { fakeProject } from './fake-project';
import { fakeRepos } from './fake-repo';

// This listing contains all info needed for guaranteed routes across '/jobs', '/orgs', '/repo', etc
export const fakeGuaranteedListing = (): Listing => {
  const org: Org = {
    ...fakeOrg(),
    name: ORG_UNISWAP_LABS,
    avatar: `/org/${ORG_UNISWAP_LABS}.svg`,
    location: getOrgLocation(ORG_UNISWAP_LABS),
  };

  const jobs = [
    fakeJob(org, {
      role: 'Senior',
      scope: 'Frontend',
      suffix: 'Engineer',
      hash: '12345',
    }),
  ];

  const projects = fakeProject(false);
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
