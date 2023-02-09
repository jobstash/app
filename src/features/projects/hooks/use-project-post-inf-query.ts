import { useInfiniteQuery } from '@tanstack/react-query';

import type { ProjectPost } from '~/core/interfaces';

const fetchProjectListings = async ({ pageParam = 0 }) => {
  const res = await fetch(
    `http://localhost:3000/mocked-bff/posts/projects?cursor=${pageParam}`,
  );
  const data = await res.json();

  return data;
};

interface ProjectListingsInfQueryPage {
  nextCursor: number;
  posts: ProjectPost[];
}

export const useProjectPostInfQuery = () =>
  useInfiniteQuery<ProjectListingsInfQueryPage>(
    ['project-posts'],
    fetchProjectListings,
    {
      getNextPageParam: (page) => page.nextCursor,
    },
  );
