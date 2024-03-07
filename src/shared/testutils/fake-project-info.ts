import { faker } from '@faker-js/faker';

import { ProjectAllInfo, ProjectInfo } from '~/shared/core/schemas';
import { capitalize } from '~/shared/utils/capitalize';

import { fakeAudits } from './fake-audits';
import { fakeChains } from './fake-chains';
import { fakeHacks } from './fake-hacks';
import { fakeLogo } from './fake-logo';
import { fakeSocialsInfo } from './fake-socials-info';

export const fakeProjectInfo = (): ProjectInfo => ({
  id: faker.string.uuid(),
  name: capitalize(faker.commerce.product()),
  website: faker.internet.url(),
  logo: fakeLogo(),
  category: faker.commerce.department(),
  isMainnet: faker.datatype.boolean(),
  tvl: faker.number.int({ min: 1000000, max: 10000000 }),
  monthlyRevenue: faker.number.int({ min: 100000, max: 5000000 }),
  monthlyVolume: faker.number.int({ min: 100000, max: 5000000 }),
  monthlyFees: faker.number.int({ min: 100, max: 10000 }),
  monthlyActiveUsers: faker.number.int({ min: 100, max: 5000 }),
  chains: fakeChains(),
  hacks: fakeHacks(),
  audits: fakeAudits(),
});

export const fakeProjectInfos = (min = 0, max = 3): ProjectInfo[] =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() =>
    fakeProjectInfo(),
  );

export const fakeProjectAllInfo = (): ProjectAllInfo => ({
  id: faker.string.uuid(),
  name: capitalize(faker.commerce.product()),
  website: '',
  logo: fakeLogo(),
  category: faker.commerce.department(),
  isMainnet: faker.datatype.boolean(),
  tvl: faker.number.int({ min: 1000000, max: 10000000 }),
  monthlyRevenue: faker.number.int({ min: 100000, max: 5000000 }),
  monthlyVolume: faker.number.int({ min: 100000, max: 5000000 }),
  monthlyFees: faker.number.int({ min: 100, max: 10000 }),
  monthlyActiveUsers: faker.number.int({ min: 100, max: 5000 }),
  chains: fakeChains(),
  hacks: fakeHacks(),
  audits: fakeAudits(),
  description: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
  ...(({ website, ...o }) => o)(fakeSocialsInfo()),
});

export const fakeProjectAllInfos = (min = 0, max = 3): ProjectAllInfo[] =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() =>
    fakeProjectAllInfo(),
  );
