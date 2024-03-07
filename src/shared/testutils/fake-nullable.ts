import { faker } from '@faker-js/faker';

export const fakeNullable = <T>(value: T, probability = 0.5) =>
  faker.datatype.boolean(probability) ? value : null;
