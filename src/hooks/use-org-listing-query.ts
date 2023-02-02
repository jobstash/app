import { useQuery } from '@tanstack/react-query';

import type { ListingsResponse } from '~/core/interfaces/listings-response';

const fetchOrgListings = async () => {
  const res = await fetch('http://localhost:3000/mocked-bff/listings/orgs');
  const data = await res.json();

  return data;
};

export const useOrgListingQuery = () =>
  useQuery<ListingsResponse>({
    queryKey: ['org-listing'],
    queryFn: fetchOrgListings,
  });
