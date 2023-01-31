import type { Project } from '~/core/interfaces';

import { fakeChain, fakeChains } from './fake-chains';
import { fakeDesc } from './fake-desc';
import { fakeSkills } from './fake-skill';
import { fakeTags } from './fake-tag';
import { nullProbability } from './null-probability';

export const fakeProject = (hasProbability = true): Project | null => {
  // Project is based on chains for now
  const { name, avatar } = fakeChain();
  const description = fakeDesc(5, 10);

  const chains = fakeChains();

  const tags = {
    top: fakeTags(3, 5),
    bottom: fakeTags(3, 5),
  };

  const skills = fakeSkills(3, 5);

  const value = {
    name,
    avatar,
    description,
    chains,
    tags,
    skills,
  };

  return nullProbability(value, hasProbability);
};
