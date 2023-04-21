import { NEXT_PUBLIC_MW_URL } from '~/shared/core/constants';

import { ShortOrg } from '../core/types';

export const fetchOrgDeets = async (id?: string) => {
  const res = await fetch(`${NEXT_PUBLIC_MW_URL}/organizations/${id}`, {
    mode: 'cors',
    credentials: 'include',
  });
  const { data } = await res.json();

  return data;
};
