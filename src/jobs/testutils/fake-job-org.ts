import { fakeFundingRounds } from '~/shared/testutils/fake-funding-rounds';
import { fakeInvestors } from '~/shared/testutils/fake-investors';
import { fakeOrgInfo } from '~/shared/testutils/fake-org-info';
import { fakeProjectAllInfos } from '~/shared/testutils/fake-project-info';

import { JobOrg } from '~/jobs/core/schemas';

export const fakeJobOrg = (): JobOrg => ({
  ...fakeOrgInfo(),
  fundingRounds: fakeFundingRounds(),
  investors: fakeInvestors(),
  projects: fakeProjectAllInfos(),
});
