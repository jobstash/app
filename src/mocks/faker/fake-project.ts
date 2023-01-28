import { faker } from '@faker-js/faker';

import type { Project } from '~/core/interfaces';

import { fakeChain, fakeChains } from './fake-chains';
import { fakeDesc } from './fake-desc';
import { fakeSkills } from './fake-skill';
import { fakeTags } from './fake-tag';

export const fakeProject = (): Project | null => {
  // Project is based on chains for now
  const { name, avatar } = fakeChain();
  const description = fakeDesc(5, 10);

  const chains = fakeChains();

  const tags = {
    top: fakeTags(2, 4),
    bottom: fakeTags(2, 3),
  };

  const skills = fakeSkills(3, 5);

  // Probability a job has a project
  const probability = 0.6;
  const sample = faker.datatype.float({ min: 0, max: 1, precision: 0.01 });

  // We need to void, nextjs cannot serialize undefined like wtf
  if (sample > probability) return null;

  return {
    name,
    avatar,
    description,
    chains,
    tags,
    skills,
  };
};
