/* eslint-disable @typescript-eslint/no-explicit-any */
import { type GetServerSideProps } from 'next';

import { type ProjectDetailsPageProps } from '@jobstash/projects/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
  type ProjectDetails,
  type ProjectListQueryPage,
} from '@jobstash/projects/core';
import { ERR_NOT_FOUND } from '@jobstash/shared/core';
import { createProjectsFilterParamsObj } from '@jobstash/projects/utils';
import { sentryMessage, withCSR } from '@jobstash/shared/utils';

import { getProjectDetails, getProjectList } from '@jobstash/projects/data';

export { ProjectDetailsPage as default } from '@jobstash/projects/pages';

export const getServerSideProps: GetServerSideProps<ProjectDetailsPageProps> =
  withCSR(
    async (ctx) => {
      const queryClient = new QueryClient();

      const filterParamsObj = createProjectsFilterParamsObj(ctx.query);

      await queryClient.fetchInfiniteQuery({
        queryKey: ['project-list', filterParamsObj],
        queryFn: async ({ pageParam }) =>
          getProjectList(pageParam ?? 1, filterParamsObj),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 60, // 1hr
        // getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
      });

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

      const { slug } = ctx.query;
      const projectId = (slug as string).slice(-36) ?? '';

      let initProjectDetails: ProjectDetails | null = null;
      try {
        initProjectDetails = await getProjectDetails(projectId);
      } catch (error) {
        if ((error as Error).message === ERR_NOT_FOUND) {
          return {
            props: {
              notFoundInfo: {
                link: '/projects',
                title: 'Project Not Found',
                message: "The project you tried to find doesn't exist",
                buttonText: 'Back to Project List',
              },
            },
          } as any;
        }

        sentryMessage(
          '/projects SSR',
          `failed fetching first projectListItem details ${projectId}`,
        );

        throw error;
      }

      const dehydratedState = dehydrate(queryClient);
      (dehydratedState.queries[0].state.data as any).pageParams = [null];

      return {
        props: {
          dehydratedState,
          initProjectDetails,
          fromSSR: true,
        },
      };
    },
    { props: { initProjectDetails: null, fromSSR: false } },
  );
