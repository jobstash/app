import { faker } from '@faker-js/faker';

import { JobPost } from '~/features/jobs/core/interfaces';
import { fakeOrg, fakeProject } from '~/shared/testutils/fakers';

import { fakeJob } from '../../../shared/testutils/fakers/fake-job';

export const fakeJobPost = (): JobPost => ({
  organization: fakeOrg(),
  project: fakeProject(),
  jobpost: fakeJob(),
  technologies: Array.from({
    length: faker.datatype.number({ min: 3, max: 8 }),
  })
    .fill(0)
    .map(() => faker.lorem.word({ length: { min: 4, max: 10 } })),
  categories: Array.from({
    length: faker.datatype.number({ min: 3, max: 8 }),
  })
    .fill(0)
    .map(() => faker.lorem.word({ length: { min: 4, max: 10 } })),
});
