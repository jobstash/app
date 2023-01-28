import { faker } from '@faker-js/faker';

import { VoidFn } from '~/core/types';

/** Returns array using faker fn */
export const fakeArrayFromFaker = <T>(fn: VoidFn, min: number, max: number) => {
  const result = Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fn()) as T[];

  // Only 70% of total length
  const length = Math.floor(result.length * 0.7);

  return faker.helpers.uniqueArray(result, length);
};
