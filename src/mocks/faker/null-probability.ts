import { faker } from '@faker-js/faker';

/** Returns value w/ 60% chance otherwise null */
export const nullProbability = <T>(value: T, hasProbability: boolean) => {
  if (hasProbability) {
    const probability = 0.6;
    const sample = faker.datatype.float({ min: 0, max: 1, precision: 0.01 });

    // We need to void, nextjs cannot serialize undefined like wtf
    if (sample > probability) return null;
  }

  return value as T;
};
