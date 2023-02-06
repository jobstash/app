import { faker } from '@faker-js/faker';

import type { Organization } from '~/core/interfaces';

import { fakeDesc } from './fake-desc';
import { fakeTechs } from './fake-tech';

export const poolOrgs = [
  'Aave',
  'Balancer',
  'Curve',
  'Pancake Swap',
  'Polygon',
  'Uniswap Labs',
  'Versa Games',
] as const;

const locationMap: Record<(typeof poolOrgs)[number], string> = {
  [poolOrgs[0]]: 'London, UK',
  [poolOrgs[1]]: 'Lisbon, Portugal',
  [poolOrgs[2]]: 'Paris, France',
  [poolOrgs[3]]: 'Rio De Janeiro, Brazil',
  [poolOrgs[4]]: 'California, US',
  [poolOrgs[5]]: 'NYC, USA',
  [poolOrgs[6]]: 'Copenhagen, Denmark',
};

export const getOrgLocation = (org: keyof typeof locationMap) =>
  locationMap[org];

export const fakeOrg = (): Organization => {
  const id = faker.datatype.number();
  const name = faker.helpers.arrayElement(poolOrgs);
  const avatar = `/orgs/${name}.png`;
  const location = getOrgLocation(name);
  const teamSize = faker.datatype.number({ min: 6, max: 16 });
  const fundingDay = faker.datatype.number({ min: 10, max: 30 });
  const fundingMonth = faker.date.month({ abbr: true });
  const fundingYear = faker.datatype.number({ min: 2016, max: 2023 });
  const fundingAmount = `$${faker.datatype.number({ min: 1, max: 20 })}M`;
  const funding = {
    date: `${fundingDay} ${fundingMonth}, ${fundingYear}`,
    amount: fundingAmount,
  };
  const summary = fakeDesc(2, 4);
  const description = fakeDesc(6, 12);
  const website = {
    text: `${name}.org`,
    link: '#',
  };
  const github = { text: 'Github', link: '#' };
  const twitter = { text: 'Twitter', link: '#' };
  const linkedIn = { text: 'Linkedin', link: '#' };
  const discord = { text: 'Discord', link: '#' };
  const techs = fakeTechs(4, 6);

  return {
    id,
    name,
    avatar,
    location,
    teamSize,
    funding,
    summary,
    description,
    website,
    github,
    twitter,
    linkedIn,
    discord,
    techs,
  };
};
