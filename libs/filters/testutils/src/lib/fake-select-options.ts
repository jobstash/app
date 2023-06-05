import { faker } from '@faker-js/faker';

export const fakeSelectOptions = (): { label: string; value: string }[] =>
  Array.from({
    length: faker.number.int({ min: 2, max: 6 }),
  }).map(() => ({
    label: faker.word.noun(),
    value: faker.word.noun(),
  }));
