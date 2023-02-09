import { useInfiniteQuery } from '@tanstack/react-query';

import type { OrgPost } from '~/core/interfaces';

const fetchOrgListings = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `http://localhost:3000/mocked-bff/posts/orgs?cursor=${pageParam}`,
  );
  const data = await res.json();

  return data;
};

interface OrgListingsInfQueryPage {
  nextCursor: number;
  posts: OrgPost[];
}

export const useOrgPostInfQuery = () =>
  useInfiniteQuery<OrgListingsInfQueryPage>(['org-posts'], fetchOrgListings, {
    getNextPageParam: (page) => page.nextCursor,
  });
