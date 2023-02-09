import { useInfiniteQuery } from '@tanstack/react-query';

import type { RepoPost } from '~/core/interfaces';

const fetchRepoListings = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `http://localhost:3000/mocked-bff/posts/repos?cursor=${pageParam}`,
  );
  const data = await res.json();

  return data;
};

interface RepoListingsInfQueryPage {
  nextCursor: number;
  posts: RepoPost[];
}

export const useRepoListingInfQuery = () =>
  useInfiniteQuery<RepoListingsInfQueryPage>(
    ['repo-posts'],
    fetchRepoListings,
    {
      getNextPageParam: (page) => page.nextCursor,
    },
  );
