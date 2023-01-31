import { faker } from '@faker-js/faker';

import type { Tech } from '~/core/interfaces';

import { fakeArrayFromFaker } from './fake-array-from-faker';

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
];

export const fakeTech = (): Tech => ({
  name: faker.helpers.arrayElement(poolTechs),
  // Adjust checkmark probability to 25%
  isChecked: Boolean(faker.helpers.maybe(() => '_', { probability: 0.25 })),
});

export const fakeTechs = (min = 2, max = 4): Tech[] =>
  fakeArrayFromFaker(fakeTech, min, max);
