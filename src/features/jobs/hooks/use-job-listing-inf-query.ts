import { useInfiniteQuery } from '@tanstack/react-query';

import type { JobListing } from '~/core/interfaces';

const fetchJobListings = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `http://localhost:3000/mocked-bff/listings/jobs?cursor=${pageParam}`,
  );
  const data = await res.json();

  return data;
};

interface JobListingsInfQueryPage {
  nextCursor: number;
  listings: JobListing[];
}

export const useJobListingInfQuery = () =>
  useInfiniteQuery<JobListingsInfQueryPage>(
    ['job-listings'],
    fetchJobListings,
    {
      getNextPageParam: (page) => page.nextCursor,
    },
  );
