import { dehydrate, QueryClient } from '@tanstack/react-query';

import { HOME_PAGE_SKILL_COUNT } from '@jobstash/home/core';
import { ROUTE_SECTION } from '@jobstash/shared/core';

import { getFilterConfig } from '@jobstash/filters/data';
import { getPopularSkills } from '@jobstash/home/data';
import { getJobList } from '@jobstash/jobs/data';
import { getOrgList } from '@jobstash/organizations/data';

export { HomePage as default } from '@jobstash/home/pages';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['home-page', 'orgs'],
      queryFn: () => getOrgList(1, undefined, 10_000),
    }),
    queryClient.prefetchQuery({
      queryKey: ['home-page', 'jobs'],
      queryFn: () => getJobList(1, undefined, 3),
    }),
    queryClient.prefetchQuery({
      queryKey: ['filter-config', ROUTE_SECTION.JOBS],
      queryFn: () => getFilterConfig(ROUTE_SECTION.JOBS),
    }),
    queryClient.prefetchQuery({
      queryKey: ['popular-skills', HOME_PAGE_SKILL_COUNT],
      queryFn: () => getPopularSkills(HOME_PAGE_SKILL_COUNT),
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
