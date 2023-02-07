import { useInfiniteQuery } from '@tanstack/react-query';

import type { ProjectListing } from '~/core/interfaces';

const fetchProjectListings = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `http://localhost:3000/mocked-bff/listings/projects?cursor=${pageParam}`,
  );
  const data = await res.json();

  return data;
};

interface ProjectListingsInfQueryPage {
  nextCursor: number;
  listings: ProjectListing[];
}

export const useProjectListingInfQuery = () =>
  useInfiniteQuery<ProjectListingsInfQueryPage>(
    ['project-listings'],
    fetchProjectListings,
    {
      getNextPageParam: (page) => page.nextCursor,
    },
  );
