import { faker } from '@faker-js/faker';

import { VoidFn } from '~/core/types';

/** Returns array using faker fn */
export const fakeArrayFromFaker = <T>(fn: VoidFn, min: number, max: number) =>
  Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fn()) as T[];
