import { faker } from '@faker-js/faker';

import { fakeJob, fakeOrg, fakeProject } from '~/shared/testutils/fakers';

import { Job } from '../core/types';

const dedupe = (skills: { id: string; name: string }[]) => {
  const set = new Set();

  const result: { id: string; name: string }[] = [];

  for (const skill of skills) {
    if (set.has(skill.id)) continue;
    result.push(skill);
    set.add(skill.id);
  }

  return result;
};

export const fakeJobPost = (): Job => ({
  organization: fakeOrg(),
  project: fakeProject(),
  jobpost: fakeJob(),
  technologies: dedupe(
    Array.from({
      length: faker.datatype.number({ min: 3, max: 8 }),
    })
      .fill(0)
      .map(() => ({
        id: faker.datatype.uuid(),
        name: faker.lorem.word({ length: { min: 4, max: 10 } }),
      })),
  ),
  categories: dedupe(
    Array.from({
      length: faker.datatype.number({ min: 3, max: 8 }),
    })
      .fill(0)
      .map(() => ({
        id: faker.datatype.uuid(),
        name: faker.lorem.word({ length: { min: 4, max: 10 } }),
      })),
  ),
});
