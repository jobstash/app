import { GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { getFilterFromQuery } from '~/features/filtersx/utils';
import { JobList } from '~/features/jobs/components';
import { fetchJobList } from '~/features/jobs/fetch';
import { SideBar } from '~/features/sidebar/components';
import { withCSR } from '~/shared/hocs';

interface Props {}

const JobListPage = () => (
  <div className="w-full pl-52 pr-[41.67%]">
    <SideBar />

    <div className="px-8">
      <JobList activeJob={null} />
    </div>
  </div>
);

export default JobListPage;

export const getServerSideProps: GetServerSideProps<Props> = withCSR(
  async (ctx) => {
    const queryClient = new QueryClient();

    const { filterParams } = getFilterFromQuery(ctx.query);

    await queryClient.fetchInfiniteQuery({
      queryKey: ['job-posts', filterParams],
      queryFn: async ({ pageParam, queryKey }) =>
        fetchJobList({ pageParam, queryKey }),
    });

    // If later you implement a JobPost query, you can iterate on first dehydrate result
    // and use setQueryData to cache result of individual fetched jobpost
    // then use a second dehydrate as the final dehydratedState to include cached queries
    const dehydratedState = dehydrate(queryClient);

    // Need this since pageParams defaults to [undefined] which nextjs cannot serialize
    (dehydratedState.queries[0].state.data as any).pageParams = [null];

    return {
      props: {
        dehydratedState,
      },
    };
  },
);
