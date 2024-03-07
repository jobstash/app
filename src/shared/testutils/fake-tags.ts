import { faker } from '@faker-js/faker';

import { Tag } from '~/shared/core/schemas';

export const fakeTag = (): Tag => ({
  id: faker.string.uuid(),
  name: faker.lorem.words({ min: 1, max: 2 }),
  normalizedName: faker.internet.domainName(),
});

export const fakeTags = (min = 0, max = 12): Tag[] =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() => fakeTag());
