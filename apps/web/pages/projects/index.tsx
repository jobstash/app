/* eslint-disable @typescript-eslint/no-explicit-any */
import { type GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
  type ProjectDetails,
  type ProjectListQueryPage,
} from '@jobstash/projects/core';
import { createProjectsFilterParamsObj } from '@jobstash/projects/utils';
import { sentryMessage, withCSR } from '@jobstash/shared/utils';

import { getProjectDetails, getProjectList } from '@jobstash/projects/data';

interface Props {
  initActiveProject: ProjectDetails | null;
}

export const getServerSideProps: GetServerSideProps<Props> = withCSR(
  async (ctx) => {
    const queryClient = new QueryClient();

    const filterParamsObj = createProjectsFilterParamsObj(ctx.query);

    await queryClient.fetchInfiniteQuery(
      ['project-list', filterParamsObj],
      async ({ pageParam }) => getProjectList(pageParam ?? 1, filterParamsObj),
      {
        staleTime: 1000 * 60 * 60, // 1hr
        getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
      },
    );

    // Prefetch individual project details
    const initDehydratedState = dehydrate(queryClient);
    const projectListItems = (
      initDehydratedState.queries[0].state.data as any
    ).pages.flatMap((d: ProjectListQueryPage) => d.data);
    const hasItems = projectListItems.length > 0;

    if (hasItems) {
      for (const projectListItem of projectListItems) {
        const { id } = projectListItem;
        queryClient.prefetchQuery({
          queryKey: ['project-details', id],
          queryFn: () => getProjectDetails(id),
        });
      }
    }

    // Fetch first project detail
    let initActiveProject: ProjectDetails | null = null;
    if (hasItems) {
      try {
        initActiveProject = await getProjectDetails(projectListItems[0].id);
      } catch {
        initActiveProject = null;
        sentryMessage(
          '/project SSR',
          'failed fetching first projectListItem details',
        );
      }
    }

    const dehydratedState = dehydrate(queryClient);
    (dehydratedState.queries[0].state.data as any).pageParams = [null];

    return {
      props: {
        dehydratedState,
        initActiveProject,
      },
    };
  },
);

export { ProjectListPage as default } from '@jobstash/projects/pages';
