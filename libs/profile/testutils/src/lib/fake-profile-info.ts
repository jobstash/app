import { faker } from '@faker-js/faker';
import { fakeNullable } from '@jobstash/shared/testutils';

import {
  CONTACT_DEFAULT_OPTIONS,
  DevProfileInfo,
} from '@jobstash/profile/core';

export const fakeProfileInfo = (): DevProfileInfo => ({
  avatar: fakeNullable(faker.image.avatar()),
  username: fakeNullable(faker.internet.userName()),
  email: fakeNullable(faker.internet.email()),
  availableForWork: faker.datatype.boolean(),
  contact: {
    preferred: faker.helpers.arrayElement(CONTACT_DEFAULT_OPTIONS),
    value: fakeNullable(faker.internet.userName()),
  },
  location: {
    country: faker.location.country(),
    city: faker.location.city(),
  },
});

export const fakeProfileInfos = () =>
  Array.from({ length: 12 }).map(() => fakeProfileInfo());
