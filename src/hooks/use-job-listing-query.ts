import { useQuery } from '@tanstack/react-query';

import type { ListingsResponse } from '~/core/interfaces/listings-response';

const fetchJobListings = async () => {
  const res = await fetch('http://localhost:3000/mocked-bff/listings/jobs');
  const data = await res.json();

  return data;
};

export const useJobListingQuery = () =>
  useQuery<ListingsResponse>({
    queryKey: ['job-listing'],
    queryFn: fetchJobListings,
  });
