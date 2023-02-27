import { faker } from '@faker-js/faker';

export const fakeDesc = (min = 3, max = 6) =>
  faker.lorem.sentences(faker.datatype.number({ min, max }));
