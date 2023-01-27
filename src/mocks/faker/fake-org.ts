import { faker } from '@faker-js/faker';

import {
  ORG_AAVE,
  ORG_BALANCER,
  ORG_CURVE,
  ORG_PANCAKE_SWAP,
  ORG_POLYGON,
  ORG_UNISWAP_LABS,
  ORG_VERSA_GAMES,
} from '~/core/constants';

import { fakeDesc } from './fake-desc';
import { fakeTag, fakeTags } from './fake-tag';

/**
 * List of orgs to choose from.
 * * Note: These orgs are placeholders! They are NOT FINAL.
 * *			 These are just mainly used to map the svgs in public dir.
 * *       Ideally, backend should provide the link for uploaded images.
 * */
const poolOrgs = [
  ORG_AAVE,
  ORG_BALANCER,
  ORG_CURVE,
  ORG_PANCAKE_SWAP,
  ORG_POLYGON,
  ORG_UNISWAP_LABS,
  ORG_VERSA_GAMES,
];

export type OrgName =
  | typeof ORG_AAVE
  | typeof ORG_BALANCER
  | typeof ORG_CURVE
  | typeof ORG_PANCAKE_SWAP
  | typeof ORG_POLYGON
  | typeof ORG_UNISWAP_LABS
  | typeof ORG_VERSA_GAMES;

/** [PLACEHOLDER] */
const locationMap: Record<OrgName, string> = {
  [ORG_AAVE]: 'London, UK',
  [ORG_BALANCER]: 'Lisbon, Portugal',
  [ORG_CURVE]: 'Paris, France',
  [ORG_PANCAKE_SWAP]: 'Rio De Janeiro, Brazil',
  [ORG_POLYGON]: 'California, USA',
  [ORG_UNISWAP_LABS]: 'NYC, USA',
  [ORG_VERSA_GAMES]: 'Copenhagen, Denmark',
};

// Exported for fakers allowing 'Remote' locations
export const getOrgLocation = (org: OrgName) => locationMap[org];

export const fakeOrg = () => {
  const selected = faker.helpers.arrayElement(poolOrgs) as OrgName;
  const avatar = `/org/${selected}.svg`;

  const location = getOrgLocation(selected);

  const teamSize = faker.datatype.number({ min: 6, max: 16 });

  const dayNum = faker.datatype.number({ min: 1, max: 27 });
  const month = faker.date.month({ abbr: true });
  const year = faker.datatype.number({ min: 2016, max: 2022 });
  const fundingDate = `${dayNum} ${month}, ${year}`;

  const description = fakeDesc(3, 5);

  const tags = fakeTags();

  return {
    name: selected,
    avatar,
    location,
    teamSize,
    fundingDate,
    description,
    tags,
  };
};
