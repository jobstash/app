import { faker } from '@faker-js/faker';

import { Tech } from '~/core/interfaces';

import { poolTechs } from './fake-tech';

// We'll only get 1 - 2 skills each
const getSkillSubset = (skills: Tech[]) =>
  skills.slice(0, faker.datatype.number({ min: 1, max: 2 }));

export const fakeSkills = () => {
  // There are 12 skills total (fake pool)
  const allTechs = faker.helpers
    .shuffle(poolTechs)
    .map((name) => ({ name, isChecked: faker.datatype.boolean() }));

  const main = allTechs.slice(0, 4);
  const hasMentor = allTechs.slice(4, 8);
  const shared = allTechs.slice(8, 12);

  // Randomize included subskills to make it more realistic
  return {
    main: getSkillSubset(main),
    hasMentor: getSkillSubset(hasMentor),
    shared: getSkillSubset(shared),
  };
};
