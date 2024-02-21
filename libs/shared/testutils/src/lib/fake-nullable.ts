import { faker } from '@faker-js/faker';

export const fakeNullable = <T>(value: T) =>
  faker.datatype.boolean() ? value : null;
