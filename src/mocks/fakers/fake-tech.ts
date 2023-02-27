import { faker } from '@faker-js/faker';

import type { Tech } from '~/shared/core/interfaces';

export const poolTechs = [
  'REACT',
  'JEST',
  'TYPESCRIPT',
  'RUST',
  'GO',
  'SOLIDITY',
  'IPFS',
  'ARWEAVE',
  'GAIA',
  'STACKS.JS',
  'WEB3.JS',
  'ETHER.JS',
  'HARDHAT',
];

export const fakeTech = (): Tech => ({
  name: faker.helpers.arrayElement(poolTechs),
  isChecked: Boolean(faker.helpers.maybe(() => '_', { probability: 0.25 })),
});

export const fakeTechs = (min = 2, max = 13): Tech[] => {
  const allTechs = faker.helpers.shuffle(poolTechs).map((name) => ({
    name,
    isChecked: Boolean(faker.helpers.maybe(() => '_', { probability: 0.25 })),
  }));

  return faker.helpers.arrayElements(
    allTechs,
    faker.datatype.number({ min, max }),
  );
};
