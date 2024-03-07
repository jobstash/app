import { faker } from '@faker-js/faker';

import { Audit } from '~/shared/core/schemas';

export const fakeAudit = (): Audit => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  link: faker.internet.url(),
});

export const fakeAudits = (min = 0, max = 6): Audit[] =>
  Array.from({ length: faker.number.int({ min, max }) }).map(() => fakeAudit());
