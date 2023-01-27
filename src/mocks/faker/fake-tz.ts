import { faker } from '@faker-js/faker';

export const fakeTz = () =>
  `UTC ${faker.helpers.arrayElement(['-', '+'])}${faker.datatype.number({
    min: 1,
    max: 12,
  })}`;
