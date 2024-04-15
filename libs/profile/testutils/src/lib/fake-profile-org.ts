import { faker } from '@faker-js/faker';
import { fakeNullable } from '@jobstash/shared/testutils';

import { ProfileOrg } from '@jobstash/profile/core';

export const fakeProfileOrg = (): ProfileOrg => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  description: faker.lorem.sentences({ min: 3, max: 5 }),
  orgId: faker.string.numeric({ length: { min: 3, max: 5 } }),
  location: `${faker.location.city()}, ${faker.location.country()}`,
  summary: faker.lorem.sentences({ min: 1, max: 2 }),
  altName: fakeNullable(faker.company.name()),
  jobsiteLink: fakeNullable(faker.internet.url()),
  updatedTimestamp: fakeNullable(faker.date.recent().getDate()),
  github: fakeNullable(faker.internet.userName()),
  twitter: fakeNullable(faker.internet.userName()),
  discord: fakeNullable(faker.internet.userName()),
  docs: fakeNullable(faker.internet.url()),
  website: fakeNullable(faker.internet.url()),
  telegram: fakeNullable(faker.internet.userName()),
  headCount: fakeNullable(faker.number.int({ min: 1, max: 50 })),
  logo: fakeNullable(faker.image.url()),
});
