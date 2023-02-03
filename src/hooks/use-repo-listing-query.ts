import { useQuery } from '@tanstack/react-query';

import type { ListingsResponse } from '~/core/interfaces/listings-response';

const fetchRepoListings = async () => {
  const res = await fetch('http://localhost:3000/mocked-bff/listings/repos');
  const data = await res.json();

  return data;
};

export const useRepoListingQuery = () =>
  useQuery<ListingsResponse>({
    queryKey: ['project-listing'],
    queryFn: fetchRepoListings,
  });
