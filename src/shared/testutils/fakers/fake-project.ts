import { faker } from '@faker-js/faker';

import { Project } from '~/shared/core/interfaces';
import { capitalize } from '~/shared/utils';

import { fakeDesc } from './fake-desc';

export const fakeProject = (): Project => {
  const id = faker.datatype.uuid();

  const name = `[FAKE] ${faker.helpers.arrayElement([
    'Uniswap V3',
    'Pancake Swap',
    'Balancer V2 Protocol',
  ])}`;

  const description = fakeDesc();

  const url = faker.internet.url();

  const logo = '';

  const tokenAddress =
    faker.helpers.maybe(() => faker.datatype.uuid()) ?? (null as any);

  const tokenSymbol =
    faker.helpers.maybe(() => faker.lorem.word(3).toUpperCase()) ??
    (null as any);

  const isInConstruction = faker.datatype.boolean();

  const tvl = faker.datatype.number({ min: 5_000_000, max: 50_000_000 });

  const monthlyVolume = faker.datatype.number({
    min: 500_000,
    max: 5_000_000,
  });

  const monthlyFees = faker.datatype.number({
    min: 200_000,
    max: 3_000_000,
  });

  const monthlyRevenue = faker.datatype.number({
    min: 5_000_000,
    max: 50_000_000,
  });

  const createdTimestamp = Date.now();
  const updatedTimestamp = Date.now();

  const hacks = Array.from({
    length: faker.datatype.number({ min: 1, max: 8 }),
  })
    .fill(0)
    .map(() => ({
      id: faker.datatype.uuid(),
      link: faker.internet.url(),
      classification: capitalize(faker.word.verb()),
      fundsLost: faker.datatype.number({ min: 1000, max: 5_000_000 }),
      date: Date.now() / 1000,
    }));

  const audits = Array.from({
    length: faker.datatype.number({ min: 3, max: 8 }),
  })
    .fill(0)
    .map(() => faker.lorem.word({ length: { min: 4, max: 10 } }));

  const chains = Array.from({
    length: faker.datatype.number({ min: 3, max: 8 }),
  })
    .fill(0)
    .map(() => faker.image.abstract(32, 32, true));

  const defillamaId =
    faker.helpers.maybe(() => faker.datatype.uuid()) ?? (null as any);
  const defillamaSlug =
    faker.helpers.maybe(() => faker.internet.domainWord()) ?? (null as any);
  const defillamaParent =
    faker.helpers.maybe(() => faker.internet.domainWord()) ?? (null as any);

  return {
    id,
    name,
    description,
    url,
    logo,
    tokenAddress,
    tokenSymbol,
    isInConstruction,
    tvl,
    monthlyVolume,
    monthlyFees,
    monthlyRevenue,
    createdTimestamp,
    updatedTimestamp,
    hacks,
    audits,
    chains,
    defillamaId,
    defillamaSlug,
    defillamaParent,
  };
};
