import type { Project } from '~/core/interfaces';

import { fakeChain, fakeChains } from './fake-chains';
import { fakeDesc } from './fake-desc';
import { fakeTags } from './fake-tag';
import { fakeTechs } from './fake-tech';
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

  const techs = fakeTechs(3, 5);

  const value = {
    name,
    avatar,
    description,
    chains,
    tags,
    techs,
  };

  return nullProbability(value, hasProbability);
};
