import { faker } from '@faker-js/faker';

import { Org, Repository } from '~/core/interfaces';

import { fakeDesc } from './fake-desc';
import { fakeSkills } from './fake-skill';
import { fakeTags } from './fake-tag';

export const fakeRepo = (org: Org): Repository | null => {
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

  // Probability having repository
  const probability = 0.4;
  const sample = faker.datatype.float({ min: 0, max: 1, precision: 0.01 });

  // We need to void, nextjs cannot serialize undefined like wtf
  if (sample > probability) return null;

  return { name, desc, tags, devInfos };
};

export const fakeRepos = (org: Org, min = 1, max = 4): Repository[] =>
  Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeRepo(org))
    .filter(Boolean) as Repository[];
