import { faker } from '@faker-js/faker';

import { Chain } from '~/shared/core/schemas';

const fakeChain = (): Chain => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  logo: faker.image.urlLoremFlickr({ width: 64, height: 64 }),
});

export const fakeChains = (min = 0, max = 6): Chain[] =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() => fakeChain());
