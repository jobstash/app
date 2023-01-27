import { faker } from '@faker-js/faker';

import type { Tag } from '~/core/interfaces';

export const fakeTag = (): Tag => {
  const text = faker.lorem.words(faker.helpers.arrayElement([1, 1, 1, 2]));
  const link = faker.helpers.maybe(() => 'google.com');

  // We need to omit link entirely, otherwise nextjs will throw runtime error
  // Since it cannot serialize 'undefined' values 🤷🏻
  if (!link) return { text };

  return {
    text,
    link,
  };
};
