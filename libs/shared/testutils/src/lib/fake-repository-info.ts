import { faker } from '@faker-js/faker';

import { RepositoryInfo } from '@jobstash/shared/core';

import { fakeNullable } from './fake-nullable';

export const fakeRepositoryInfo = (): RepositoryInfo => ({
  id: faker.string.uuid(),
  name: faker.internet.domainName(),
  description: faker.lorem.sentences({ min: 1, max: 3 }),
  timestamp: fakeNullable(faker.date.past().getDate()),
  projectName: fakeNullable(faker.commerce.product()),
  committers: fakeNullable(faker.number.int({ min: 1, max: 50 })),
});
