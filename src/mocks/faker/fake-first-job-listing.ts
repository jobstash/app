import { ORG_UNISWAP_LABS } from '~/core/constants';
import { JobListing, Org } from '~/core/interfaces';

import { fakeJob } from './fake-job';
import { fakeOrg, getOrgLocation } from './fake-org';
import { fakeProject } from './fake-project';

export const fakeFirstJobListing = (): JobListing => {
  const org: Org = {
    ...fakeOrg(),
    name: ORG_UNISWAP_LABS,
    avatar: `/org/${ORG_UNISWAP_LABS}.svg`,
    location: getOrgLocation(ORG_UNISWAP_LABS),
  };

  const job = fakeJob(org, {
    role: 'Senior',
    scope: 'Frontend',
    suffix: 'Engineer',
    hash: '12345',
  });

  const project = fakeProject();

  return {
    org,
    job,
    project,
    competitors: null,
    repositories: null,
  };
};
