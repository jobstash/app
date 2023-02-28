import { faker } from '@faker-js/faker';

import { Organization } from '~/shared/core/interfaces';

import { fakeDesc } from './fake-desc';

export const fakeOrg = (): Organization => {
  const id = faker.datatype.uuid();
  const orgId = faker.datatype.uuid();

  const name = `FAKE ${faker.helpers.arrayElement([
    'Uniswap Labs',
    'Aave',
    'Balancer',
    'Curve',
    'Pancake Swap',
    'Polygon',
    'Versa Games',
  ])}`;

  const description = fakeDesc();

  const summary = fakeDesc();

  const url = faker.internet.url();

  const location = faker.helpers.arrayElement([
    'NYC, USA',
    'Boston, USA',
    'Amsterdam, NL',
    'Rio De Janeiro, Brazil',
  ]);

  const createdTimestamp = Date.now();
  const updatedTimestamp = Date.now();

  const githubOrganization = faker.internet.url();

  const teamSize = `${faker.datatype.number({ min: 4, max: 12 })}`;

  const twitter =
    faker.helpers.maybe(() => faker.internet.url()) ?? (null as any);
  const discord =
    faker.helpers.maybe(() => faker.internet.url()) ?? (null as any);
  const linkedin =
    faker.helpers.maybe(() => faker.internet.url()) ?? (null as any);
  const telegram =
    faker.helpers.maybe(() => faker.internet.url()) ?? (null as any);

  return {
    id,
    orgId,
    name,
    description,
    summary,
    url,
    location,
    createdTimestamp,
    updatedTimestamp,
    githubOrganization,
    teamSize,
    twitter,
    discord,
    linkedin,
    telegram,
  };
};
