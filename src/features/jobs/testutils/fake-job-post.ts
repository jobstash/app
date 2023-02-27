import { faker } from '@faker-js/faker';

import { JobPost } from '~/features/jobs/core/interfaces';
import { fakeJob, fakeOrg, fakeProject } from '~/shared/testutils/fakers';

const dedupeSkills = (skills: string[]) => {
  const set = new Set();

  const result = [];

  for (const skill of skills) {
    if (set.has(skill)) continue;
    result.push(skill);
    set.add(skill);
  }

  return result;
};

export const fakeJobPost = (): JobPost => ({
  organization: fakeOrg(),
  project: fakeProject(),
  jobpost: fakeJob(),
  technologies: dedupeSkills(
    Array.from({
      length: faker.datatype.number({ min: 3, max: 8 }),
    })
      .fill(0)
      .map(() => faker.lorem.word({ length: { min: 4, max: 10 } })),
  ),
  categories: Array.from({
    length: faker.datatype.number({ min: 3, max: 8 }),
  })
    .fill(0)
    .map(() => faker.lorem.word({ length: { min: 4, max: 10 } })),
});
