import { faker } from '@faker-js/faker';

import { JobInfo } from '~/shared/core/schemas';

import { fakeJobInfoTags } from './fake-job-info-tags';

export const fakeJobInfo = (): JobInfo => ({
  id: faker.string.uuid(),
  url: faker.internet.url(),
  title: faker.company.catchPhrase(),
  shortUUID: faker.string.alphanumeric(6),
  timestamp: faker.date.recent().getTime(),
  requirements: faker.lorem.sentences({ min: 0, max: 12 }).split('.'),
  responsibilities: faker.lorem.sentences({ min: 0, max: 12 }).split('.'),
  benefits: faker.lorem.sentences({ min: 0, max: 12 }).split('.'),
  summary: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
  description: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
  culture: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
  ...fakeJobInfoTags(),
});
