import { useInfiniteQuery } from '@tanstack/react-query';

import type { RepoListing } from '~/core/interfaces';

const fetchRepoListings = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `http://localhost:3000/mocked-bff/listings/repos?cursor=${pageParam}`,
  );
  const data = await res.json();

  return data;
};

interface RepoListingsInfQueryPage {
  nextCursor: number;
  listings: RepoListing[];
}

export const useRepoListingInfQuery = () =>
  useInfiniteQuery<RepoListingsInfQueryPage>(
    ['repo-listings'],
    fetchRepoListings,
    {
      getNextPageParam: (page) => page.nextCursor,
    },
  );
