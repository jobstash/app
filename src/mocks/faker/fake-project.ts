import { faker } from '@faker-js/faker';

import { fakeChain, fakeChains } from './fake-chains';
import { fakeSkills } from './fake-skill';
import { fakeTags } from './fake-tag';

export const fakeProject = () => {
  // Project is based on chains for now
  const { name, avatar } = fakeChain();

  const chains = fakeChains();

  const tags = fakeTags(4, 8);

  const skills = fakeSkills();

  // Probability a job has a project
  const probability = 0.4;
  const sample = faker.datatype.float({ min: 0, max: 1, precision: 0.01 });

  // We need to void, nextjs cannot serialize undefined like wtf
  if (sample > probability) return null;

  return {
    name,
    avatar,
    chains,
    tags,
    skills,
  };
};
