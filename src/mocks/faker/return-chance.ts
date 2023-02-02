import { faker } from '@faker-js/faker';

/** Returns value w/ 60% chance otherwise returns other value */
export const returnChance = <T, U>(
  value: T,
  other: U,
  hasProbability: boolean,
) => {
  if (hasProbability) {
    const probability = 0.6;
    const sample = faker.datatype.float({ min: 0, max: 1, precision: 0.01 });

    // We need to void, nextjs cannot serialize undefined like wtf
    if (sample > probability) return other as U;
  }

  return value as T;
};
