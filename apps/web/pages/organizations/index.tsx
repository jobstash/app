/* eslint-disable @typescript-eslint/no-explicit-any */
import { type GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
  type OrgDetails,
  type OrgListQueryPage,
} from '@jobstash/organizations/core';
import { createOrgsFilterParamsObj } from '@jobstash/organizations/utils';
import { sentryMessage, withCSR } from '@jobstash/shared/utils';

import { getOrgDetails, getOrgList } from '@jobstash/organizations/data';
import { getSSRMwVersion } from '@jobstash/shared/data';

export { OrgListPage as default } from '@jobstash/organizations/pages';

interface Props {
  initActiveOrg: OrgDetails | null;
}

export const getServerSideProps: GetServerSideProps<Props> = withCSR(
  async (ctx) => {
    const queryClient = new QueryClient();

    const filterParamsObj = createOrgsFilterParamsObj(ctx.query);

    const mwVersion = await getSSRMwVersion('org-list-page getServerSideProps');

    const ssrHost = ctx.req.headers.host;

    await queryClient.fetchInfiniteQuery({
      queryKey: [mwVersion, 'org-list', filterParamsObj, ssrHost],
      queryFn: async ({ pageParam }) =>
        getOrgList({ page: pageParam, filterParams: filterParamsObj, ssrHost }),
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
          queryKey: [mwVersion, 'org-details', orgId, ssrHost],
          queryFn: () => getOrgDetails({ orgId, ssrHost }),
        });
      }
    }

    // Fetch first org detail
    let initActiveOrg: OrgDetails | null = null;
    if (hasItems) {
      try {
        initActiveOrg = await getOrgDetails({
          orgId: orgListItems[0].orgId,
          ssrHost,
        });
      } catch {
        initActiveOrg = null;
        sentryMessage(
          '/organizations SSR',
          'failed fetching first orgListItem details',
        );
      }
    }

    const dehydratedState = dehydrate(queryClient);
    (dehydratedState.queries[0].state.data as any).pageParams = [null];

    return {
      props: {
        dehydratedState,
        initActiveOrg,
      },
    };
  },
);
