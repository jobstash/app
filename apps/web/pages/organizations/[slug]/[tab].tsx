/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from 'next';

import { type OrgDetailsPageProps } from '@jobstash/organizations/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
  type OrgDetails,
  type OrgListQueryPage,
} from '@jobstash/organizations/core';
import { ERR_NOT_FOUND } from '@jobstash/shared/core';
import { createOrgsFilterParamsObj } from '@jobstash/organizations/utils';
import { sentryMessage, withCSR } from '@jobstash/shared/utils';

import { getOrgDetails, getOrgList } from '@jobstash/organizations/data';
import { getSSRMwVersion } from '@jobstash/shared/data';

export { OrgDetailsPage as default } from '@jobstash/organizations/pages';

export const getServerSideProps: GetServerSideProps<OrgDetailsPageProps> =
  withCSR(
    async (ctx) => {
      const queryClient = new QueryClient();

      const filterParamsObj = createOrgsFilterParamsObj(ctx.query);

      const mwVersion = await getSSRMwVersion(
        'org-details-page getServerSideProps',
      );


    const ssrHost = ctx.req.headers.host;

      await queryClient.fetchInfiniteQuery({
        queryKey: [mwVersion, 'org-list', filterParamsObj, ssrHost],
        queryFn: async ({ pageParam }) =>
          getOrgList({ page: pageParam ?? 1, filterParams: filterParamsObj, ssrHost }),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 60, // 1hr
        // getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
      });

      // Prefetch individual org details
      const initDehydratedState = dehydrate(queryClient);
      const orgListItems = (
        initDehydratedState.queries[0].state.data as any
      ).pages.flatMap((d: OrgListQueryPage) => d.data);
      const hasItems = orgListItems.length > 0;

      if (hasItems) {
        for (const orgListItem of orgListItems) {
          const { orgId } = orgListItem;
          queryClient.prefetchQuery({
            queryKey: [mwVersion, 'org-details', orgId],
            queryFn: () => getOrgDetails(orgId),
          });
        }
      }

      const { slug } = ctx.query;
      const orgId = (slug as string).split('-').at(-1) ?? '';

      let initOrgDetails: OrgDetails | null = null;
      try {
        initOrgDetails = await getOrgDetails(orgId);
      } catch (error) {
        if ((error as Error).message === ERR_NOT_FOUND) {
          return {
            props: {
              notFoundInfo: {
                link: '/organizations',
                title: 'Organization Not Found',
                message: "The organization you tried to find doesn't exist",
                buttonText: 'Back to Organization List',
              },
            },
          } as any;
        }

        sentryMessage(
          '/organizations SSR',
          `failed fetching first orgListItem details ${orgId}`,
        );

        throw error;
      }

      const dehydratedState = dehydrate(queryClient);
      (dehydratedState.queries[0].state.data as any).pageParams = [null];

      return {
        props: {
          dehydratedState,
          initOrgDetails,
          fromSSR: true,
        },
      };
    },
    { props: { initOrgDetails: null, fromSSR: false } },
  );
