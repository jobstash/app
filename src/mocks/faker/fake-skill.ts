import { faker } from '@faker-js/faker';

import type { Skill } from '~/core/interfaces';

import { fakeArrayFromFaker } from './fake-array-from-faker';

const poolSkills = [
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

export const fakeSkill = (): Skill => ({
  name: faker.helpers.arrayElement(poolSkills),
  // Adjust checkmark probability to 25%
  isChecked: Boolean(faker.helpers.maybe(() => '_', { probability: 0.25 })),
});

// We'll only get 1 - 2 skills each
const getSkillSubset = (skills: Skill[]) =>
  skills.slice(0, faker.datatype.number({ min: 1, max: 2 }));

export const fakeSkills = (min = 2, max = 4): Skill[] =>
  fakeArrayFromFaker(fakeSkill, min, max);

export const fakeJobSkills = () => {
  // There are 12 skills total (fake pool)
  const allSkills = faker.helpers
    .shuffle(poolSkills)
    .map((name) => ({ name, isChecked: faker.datatype.boolean() }));

  const main = allSkills.slice(0, 4);
  const hasMentor = allSkills.slice(4, 8);
  const shared = allSkills.slice(8, 12);

  // Randomize included subskills to make it more realistic
  return {
    main: getSkillSubset(main),
    hasMentor: getSkillSubset(hasMentor),
    shared: getSkillSubset(shared),
  };
};
