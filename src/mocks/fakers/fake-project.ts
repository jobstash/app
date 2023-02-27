import { faker } from '@faker-js/faker';

import type { Project } from '~/shared/core/interfaces';

import { fakeAudits } from './fake-audits';
import { fakeChain, fakeChains } from './fake-chains';
import { fakeDesc } from './fake-desc';
import { fakeTechs } from './fake-tech';

export const fakeProject = (canBeNull = false): Project | null => {
  const chance = faker.datatype.number({ min: 1, max: 100 });
  if (canBeNull && chance > 85) {
    return null;
  }

  const id = faker.datatype.number();
  const { name, avatar } = fakeChain();
  const description = fakeDesc();
  const numJobs = faker.datatype.number({ min: 1, max: 6 });
  const numRepos = faker.datatype.number({ min: 1, max: 3 });
  const website = { text: `${name.toLowerCase()}.org`, link: '#' };
  const category = 'DEX';
  const teamSize = faker.datatype.number({ min: 3, max: 12 });
  const tvl = `$${faker.datatype.number({ min: 1, max: 5 })}M`;
  const monthlyVolume = `$${faker.datatype.number({ min: 90, max: 350 })}k`;
  const activeUsers = `${faker.datatype.number({ min: 5, max: 100 })}k`;
  const revenue = `${faker.datatype.number({ min: 80, max: 500 })}k`;
  const deployedToMainnet = faker.datatype.boolean();
  const audits = fakeAudits();
  const hacks = [{ text: 'Big Hack costing all TVL', link: '#' }];
  const chains = fakeChains().filter((chain) => chain.name !== name);
  const token = { text: 'XYZ', link: '#' };
  const techs = fakeTechs(4, 6);

  return {
    id,
    name,
    avatar,
    description,
    numJobs,
    numRepos,
    website,
    category,
    teamSize,
    tvl,
    monthlyVolume,
    activeUsers,
    revenue,
    deployedToMainnet,
    audits,
    hacks,
    chains,
    token,
    techs,
  };
};

export const fakeProjects = (min = 1, max = 4) =>
  Array.from({ length: faker.datatype.number({ min, max }) })
    .fill(0)
    .map(() => fakeProject()) as Project[];
