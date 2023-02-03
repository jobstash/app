import { useQuery } from '@tanstack/react-query';

import type { ListingsResponse } from '~/core/interfaces/listings-response';

const fetchProjectListings = async () => {
  const res = await fetch('http://localhost:3000/mocked-bff/listings/projects');
  const data = await res.json();

  return data;
};

export const useProjectListingQuery = () =>
  useQuery<ListingsResponse>({
    queryKey: ['project-listing'],
    queryFn: fetchProjectListings,
  });
