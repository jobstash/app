import { GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { Filters } from '~/features/filters/components';
import { getFilterFromQuery } from '~/features/filters/utils';
import { JobList } from '~/features/jobs/components';
import { Job } from '~/features/jobs/core/types';
import { fetchJobList } from '~/features/jobs/fetch';
import { SideBar } from '~/features/sidebar/components';
import { withCSR } from '~/shared/hocs';

interface Props {}

const JobListPage = () => (
  <div className="w-full pl-52 pr-[41.67%]">
    <SideBar />

    <div className="px-8">
      <Filters />
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

    // Cache individual item from the list
    const initDehydratedState = dehydrate(queryClient);
    const jobPosts = (initDehydratedState.queries[0].state.data as any).pages[0]
      .data as Job[];
    for (const job of jobPosts) {
      const jobUuid = job.jobpost.shortUUID;
      queryClient.setQueryData(['job-post', jobUuid], job);
    }

    // Dehydrate again to include setup'd cached data
    const dehydratedState = dehydrate(queryClient);
    (dehydratedState.queries[0].state.data as any).pageParams = [null];

    return {
      props: {
        dehydratedState,
      },
    };
  },
);
