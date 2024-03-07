import { faker } from '@faker-js/faker';

import { StarRating } from '~/shared/core/schemas';

import { fakeNullable } from './fake-nullable';

export const fakeRating = (): StarRating =>
  fakeNullable(faker.number.float({ min: 1, max: 5, precision: 1 }));
