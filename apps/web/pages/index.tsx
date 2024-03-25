import { dehydrate, QueryClient } from '@tanstack/react-query';

import { HOME_PAGE_SKILL_COUNT } from '@jobstash/home/core';
import { ROUTE_SECTION } from '@jobstash/shared/core';

import { getFilterConfig } from '@jobstash/filters/data';
import { getJobList } from '@jobstash/jobs/data';
import { getOrgList } from '@jobstash/organizations/data';
import { getPopularSkills } from '@jobstash/shared/data';

export { HomePage as default } from '@jobstash/home/pages';

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['home-page', 'orgs'],
      queryFn: () => getOrgList(1, undefined, 10_000),
      staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    }),
    queryClient.prefetchQuery({
      queryKey: ['home-page', 'jobs'],
      queryFn: () => getJobList(1, undefined, 3),
      staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    }),
    queryClient.prefetchQuery({
      queryKey: ['filter-config', ROUTE_SECTION.JOBS],
      queryFn: () => getFilterConfig(ROUTE_SECTION.JOBS),
      staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    }),
    queryClient.prefetchQuery({
      queryKey: ['popular-skills', HOME_PAGE_SKILL_COUNT],
      queryFn: () => getPopularSkills(HOME_PAGE_SKILL_COUNT),
      staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
