import { faker } from '@faker-js/faker';

import type { Tag } from '~/core/interfaces';

export const fakeTag = (): Tag => {
  const text = faker.company.name();
  const link = faker.helpers.maybe(() => 'google.com');

  // We need to omit link entirely, otherwise nextjs will throw runtime error
  // Since it cannot serialize 'undefined' values 🤷🏻
  if (!link) return { text };

  return {
    text,
    link,
  };
};

export const fakeTags = (min = 1, max = 4): Tag[] =>
  Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeTag());
