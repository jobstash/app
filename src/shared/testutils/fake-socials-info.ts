import { faker } from '@faker-js/faker';

import { SocialsInfo } from '~/shared/core/schemas';

export const fakeSocialsInfo = (): SocialsInfo => ({
  website: faker.image.avatar(),
  twitter: faker.internet.url(),
  telegram: faker.internet.url(),
  github: faker.internet.url(),
  discord: faker.internet.url(),
  docs: faker.internet.url(),
});
