import { useInfiniteQuery } from '@tanstack/react-query';

import type { OrgListing } from '~/core/interfaces';

const fetchOrgListings = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `http://localhost:3000/mocked-bff/listings/orgs?cursor=${pageParam}`,
  );
  const data = await res.json();

  return data;
};

interface OrgListingsInfQueryPage {
  nextCursor: number;
  listings: OrgListing[];
}

export const useOrgListingInfQuery = () =>
  useInfiniteQuery<OrgListingsInfQueryPage>(
    ['org-listings'],
    fetchOrgListings,
    {
      getNextPageParam: (page) => page.nextCursor,
    },
  );
