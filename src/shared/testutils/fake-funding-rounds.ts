import { faker } from '@faker-js/faker';

import { FundingRound } from '~/shared/core/schemas';

const fakeFundingRound = (): FundingRound => ({
  id: faker.string.uuid(),
  date: faker.date.past().getTime() / 1000,
  roundName: faker.company.name(),
  raisedAmount: faker.number.int({ min: 1, max: 1500 }),
  sourceLink: faker.internet.url(),
});

export const fakeFundingRounds = (min = 0, max = 6): FundingRound[] =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() =>
    fakeFundingRound(),
  );
