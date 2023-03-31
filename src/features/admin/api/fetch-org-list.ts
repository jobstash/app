import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

import { ShortOrg } from '../core/types';

const fakeData: ShortOrg[] = [
  {
    id: '0',
    name: 'Uniswap Labs',
    location: 'NYC, USA',
    logo: '/orgs/Uniswap Labs.png',
    jobCount: 2,
    projectCount: 1,
    headCount: 9,
    lastFundingAmount: 300_000,
    lastFundingDate: Date.now(),
    technologies: [
      { id: '0', name: 'REACT' },
      { id: '1', name: 'TYPESCRIPT' },
      { id: '2', name: 'WEBGL' },
    ],
  },
  {
    id: '1',
    name: '1inch Network',
    location: 'Boston, USA',
    logo: '/orgs/1Inch Network.png',
    jobCount: 1,
    projectCount: 1,
    headCount: 3,
    lastFundingAmount: 300_000,
    lastFundingDate: Date.now(),
    technologies: [
      { id: '0', name: 'DOCKER' },
      { id: '1', name: 'SOLIDITY' },
      { id: '3', name: 'HTML' },
      { id: '4', name: 'TYPESCRIPT' },
      { id: '5', name: 'WEBGL' },
    ],
  },
  {
    id: '2',
    name: 'Balancer',
    location: 'Lisbon, Portugal',
    logo: '/orgs/Balancer.png',
    jobCount: 3,
    projectCount: 1,
    headCount: 10,
    lastFundingAmount: 300_000,
    lastFundingDate: Date.now(),
    technologies: [
      { id: '0', name: 'REACT' },
      { id: '1', name: 'TYPESCRIPT' },
      { id: '2', name: 'DOCKER' },
      { id: '3', name: 'C++' },
      { id: '4', name: 'PYTHON' },
      { id: '5', name: 'SOLIDITY' },
    ],
  },
];

export const fetchOrgList = async () => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/organizations`, {
    mode: 'cors',
    credentials: 'include',
  });
  const { data } = await res.json();
  console.log('org list data =', data);

  return data ?? fakeData;
};
