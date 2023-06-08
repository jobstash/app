import { faker } from '@faker-js/faker';

import { type FilterConfigSharedProperties } from '@jobstash/filters/core';
import { capitalize } from '@jobstash/shared/utils';

export const fakeSharedFilterConfigProperties = (
  options?: Partial<FilterConfigSharedProperties>,
): FilterConfigSharedProperties => ({
  position: faker.number.int({ min: 0 }),
  label: capitalize(faker.word.noun()),
  show: true,
  ...options,
});
