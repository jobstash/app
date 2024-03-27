import { faker } from '@faker-js/faker';

import { ProfileShowcase } from '@jobstash/profile/core';

export const fakeShowcases = (min = 0, max = 12): ProfileShowcase[] =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() => ({
    id: faker.string.uuid(),
    label: faker.person.jobArea(),
    url: faker.internet.url(),
  }));
