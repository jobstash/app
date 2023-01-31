import { faker } from '@faker-js/faker';

import type { Org, Repository } from '~/core/interfaces';

import { fakeArrayFromFaker } from './fake-array-from-faker';
import { fakeDesc } from './fake-desc';
import { fakeSkills } from './fake-skill';
import { fakeTags } from './fake-tag';
import { nullProbability } from './null-probability';

export const fakeRepo = (
  org: Org,
  hasProbability = true,
): Repository | null => {
  const name = `${faker.helpers.slugify(
    org.name.toLowerCase(),
  )}/${faker.internet.domainWord()}`;
  const desc = fakeDesc(1, 1);
  const tags = fakeTags(2, 4);

  const devInfos = Array.from({
    length: faker.datatype.number({ min: 1, max: 3 }),
  })
    .fill(0)
    .map(() => ({
      devCount: faker.datatype.number({ min: 2, max: 8 }),
      skills: fakeSkills(2, 4),
    }));

  const value = { name, desc, tags, devInfos };

  return nullProbability(value, hasProbability);
};

export const fakeRepos = (org: Org, min = 1, max = 4) =>
  fakeArrayFromFaker<Repository>(() => fakeRepo(org, false), min, max);
