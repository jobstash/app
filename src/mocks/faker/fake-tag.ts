import { faker } from '@faker-js/faker';

import { tagIconMap } from '~/core/constants';
import type { Tag } from '~/core/interfaces';
import { capitalize } from '~/utils/capitalize';

import { fakeArrayFromFaker } from './fake-array-from-faker';

export const fakeTag = (): Tag => {
  const text = `${capitalize(faker.lorem.word())}: ${
    faker.helpers.maybe(() => faker.lorem.word(), { probability: 0.7 }) ??
    faker.datatype.number({ min: 1, max: 10 })
  }`;
  const link = faker.helpers.maybe(() => 'google.com');
  const iconKey = faker.helpers.arrayElement(
    Object.keys(tagIconMap),
  ) as keyof typeof tagIconMap;

  // We need to omit link entirely, otherwise nextjs will throw runtime error
  // Since it cannot serialize 'undefined' values 🤷🏻
  if (!link) return { text, iconKey };

  return {
    text,
    link,
    iconKey,
  };
};

export const fakeTags = (min = 2, max = 4): Tag[] =>
  fakeArrayFromFaker(fakeTag, min, max);
