import { faker } from '@faker-js/faker';

import { OrgInfo } from '~/shared/core/schemas';
import { capitalize } from '~/shared/utils/capitalize';

import { fakeLocation } from './fake-location';
import { fakeLogo } from './fake-logo';
import { fakeRating } from './fake-rating';
import { fakeSocialsInfo } from './fake-socials-info';

export const fakeOrgInfo = (): OrgInfo => ({
  id: faker.string.uuid(),
  name: capitalize(faker.company.name()),
  orgId: faker.number.int().toString(),
  summary: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
  location: fakeLocation(),
  description: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
  logoUrl: fakeLogo(),
  headcountEstimate: faker.number.int({ min: 3, max: 50 }),
  aggregateRating: fakeRating(),
  reviewCount: faker.number.int({ min: 0, max: 20 }),
  ...fakeSocialsInfo(),
});
