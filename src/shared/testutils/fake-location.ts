import { faker } from '@faker-js/faker';

export const fakeLocation = () =>
  `${faker.location.state()}, ${faker.location.country()}`;
