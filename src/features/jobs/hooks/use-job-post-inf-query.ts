import { useInfiniteQuery } from '@tanstack/react-query';

import type { JobPost } from '~/core/interfaces';

const fetchJobListings = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `http://localhost:3000/mocked-bff/posts/jobs?cursor=${pageParam}`,
  );
  const data = await res.json();

  return data;
};

interface JobListingsInfQueryPage {
  nextCursor: number;
  posts: JobPost[];
}

export const useJobListingInfQuery = () =>
  useInfiniteQuery<JobListingsInfQueryPage>(['job-posts'], fetchJobListings, {
    getNextPageParam: (page) => page.nextCursor,
  });
