import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

import { ShortOrg } from '../core/types';

const fakeData: ShortOrg = {
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
};

export const fetchOrgDeets = async (id?: string) => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/organizations/${id}`, {
    mode: 'cors',
    credentials: 'include',
  });
  const { data } = await res.json();

  return data;
};
