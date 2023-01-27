import { ORG_UNISWAP_LABS } from '~/core/constants';
import { JobListing, Org } from '~/core/interfaces';

import { fakeJob } from './fake-job';
import { fakeOrg, getOrgLocation } from './fake-org';

export const fakeFirstJobListing = (): JobListing => {
  const org: Org = {
    ...fakeOrg(),
    name: ORG_UNISWAP_LABS,
    avatar: `/org/${ORG_UNISWAP_LABS}.svg`,
    location: getOrgLocation(ORG_UNISWAP_LABS),
  };

  return {
    org,
    job: fakeJob(org, {
      role: 'Senior',
      scope: 'Frontend',
      suffix: 'Engineer',
      hash: '12345',
    }),
  };
};

// Expose generated data available throughout server-lifetime
// So that we don't generate fake data on every page refresh
// Data lives throught server-lifetime (until next server restart)
export const generatedFirstJobListing = fakeFirstJobListing();
