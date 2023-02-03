import { faker } from '@faker-js/faker';

import type { Project } from '~/core/interfaces';

import { fakeChain, fakeChains } from './fake-chains';
import { fakeDesc } from './fake-desc';
import { fakeTags } from './fake-tag';
import { fakeTechs } from './fake-tech';
import { returnChance } from './return-chance';

export const fakeProject = (hasProbability = true): Project[] => {
  // Project is based on chains for now
  const { name, avatar } = fakeChain();
  const description = fakeDesc(5, 10);

  const chains = fakeChains();

  const tags = {
    top: fakeTags(3, 4),
    bottom: fakeTags(3, 4),
  };

  const techs = fakeTechs(3, 5);

  const recent = `${faker.datatype.number({ min: 2, max: 6 })} days ago`;

  const value = [
    {
      name,
      avatar,
      description,
      chains,
      tags,
      techs,
      recent,
    },
  ];

  return returnChance(value, [], hasProbability);
};
