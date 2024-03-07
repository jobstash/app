import { faker } from '@faker-js/faker';

import { Investor } from '~/shared/core/schemas';

const fakeInvestor = (): Investor => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
});

export const fakeInvestors = (min = 0, max = 6): Investor[] =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() =>
    fakeInvestor(),
  );
