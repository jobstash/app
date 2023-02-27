import { faker } from '@faker-js/faker';

import type { Tag } from '~/shared/core/interfaces';

const poolAudits = [
  'SigmaPrime',
  'Chainsecurity',
  'Peckshield',
  'Consensys Diligence',
  'Mixbytes',
] as const;

export const fakeAudits = (): Tag[] =>
  faker.helpers
    .arrayElements(poolAudits, faker.datatype.number({ min: 1, max: 3 }))
    .map((name) => ({ text: name, link: '#' }));
