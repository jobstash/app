import {  type GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import {
  type OrgDetails,
  type OrgListQueryPage,
} from '@jobstash/organizations/core';
import { createOrgsFilterParamsObj } from '@jobstash/organizations/utils';
import { sentryMessage, withCSR } from '@jobstash/shared/utils';

import { getOrgDetails, getOrgList } from '@jobstash/organizations/data';

interface Props {
  fromSSR: boolean;
  initOrgDetails: OrgDetails;
}

export { OrgDetailsPage as default } from '@jobstash/organizations/pages';

export const getServerSideProps: GetServerSideProps<Props> = withCSR(
  async (ctx) => {
    const queryClient = new QueryClient();

    const filterParamsObj = createOrgsFilterParamsObj(ctx.query);

    await queryClient.fetchInfiniteQuery(
      ['org-list', filterParamsObj],
      async ({ pageParam }) => getOrgList(pageParam ?? 1, filterParamsObj),
      {
        staleTime: 1000 * 60 * 60, // 1hr
        getNextPageParam: ({ page }) => (page > 0 ? page + 1 : undefined),
      },
    );

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
          queryKey: ['org-details', orgId],
          queryFn: () => getOrgDetails(orgId),
        });
      }
    }

    const { slug } = ctx.query;
    const orgId = (slug as string).split('-').at(-1) ?? '';

    let initOrgDetails: OrgDetails | null = null;
    try {
      initOrgDetails = await getOrgDetails(orgId);
    } catch {
      initOrgDetails = null;
      sentryMessage(
        '/organizations SSR',
        'failed fetching first orgListItem details',
      );
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
