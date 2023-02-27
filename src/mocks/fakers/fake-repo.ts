import { faker } from '@faker-js/faker';

import type { Repository } from '~/shared/core/interfaces';

import { poolChains } from './fake-chains';
import { fakeDesc } from './fake-desc';
import { fakeTechs } from './fake-tech';

export const fakeRepo = (): Repository => {
  const id = faker.datatype.number();
  const name = `${faker.lorem.word({
    length: { min: 3, max: 7 },
  })}/${faker.internet.domainWord()}`;
  const description = fakeDesc(1, 1);
  const project = faker.helpers.arrayElement(poolChains);
  const type = faker.helpers.arrayElement([
    'Frontend',
    'Backend',
    'QA',
    'DevOps',
  ]);
  const committers = faker.datatype.number({ min: 3, max: 15 });
  const allTechs = fakeTechs(6, 8);
  const devInfos = [
    {
      devCount: faker.datatype.number({ min: 2, max: 8 }),
      techs: allTechs.slice(0, 3),
    },
    {
      devCount: faker.datatype.number({ min: 2, max: 8 }),
      techs: allTechs.slice(3, -1),
    },
  ];

  return { id, name, description, project, type, committers, devInfos };
};

export const fakeRepos = (min = 1, max = 4) =>
  Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeRepo());
