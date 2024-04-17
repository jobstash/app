import { faker } from '@faker-js/faker';

import { Tag } from '@jobstash/shared/core';
import { normalizeString } from '@jobstash/shared/utils';

export const fakeTag = (): Tag => {
  const id = faker.string.uuid();
  const name = faker.commerce.productName();
  const normalizedName = normalizeString(name) ?? name.toLowerCase();

  return {
    id,
    name,
    normalizedName,
  };
};
