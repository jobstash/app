import { faker } from '@faker-js/faker';

/**
 * Fake description generator
 * @param min minimum sentence count (default = 1)
 * @param max maximum sentence count (default = 3)
 * @returns sentences ranging from min-max
 */
export const fakeDesc = (min?: number, max?: number) =>
  faker.lorem.sentences(
    faker.datatype.number({ min: min ?? 1, max: max ?? 3 }),
  );
