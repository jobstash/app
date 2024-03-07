import { faker } from '@faker-js/faker';

import { Hack } from '~/shared/core/schemas';

const fakeHack = (): Hack => ({
  id: faker.string.uuid(),
  category: faker.commerce.department(),
  issueType: faker.commerce.department(),
  fundsLost: faker.number.int({ min: 500000 }),
});

export const fakeHacks = (min = 0, max = 6) =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() => fakeHack());
