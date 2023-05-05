import { GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useHydrateAtoms } from 'jotai/utils';

import { Filters } from '~/features/filters/components';
import { getFilterFromQuery } from '~/features/filters/utils';
import { activeJobAtom } from '~/features/jobs/atoms';
import { JobList } from '~/features/jobs/components';
import { Job, JobListQueryPage } from '~/features/jobs/core/types';
import { fetchJobList } from '~/features/jobs/fetch';
import { useJobListingInfQuery } from '~/features/jobs/hooks';
import { SideBar } from '~/features/sidebar/components';
import { withCSR } from '~/shared/hocs';
import { useMediaQuery } from '~/shared/hooks';

interface Props {
  activeJob: Job;
}

const JobListPage = ({ activeJob }: Props) => {
  const isMobile = useMediaQuery('(max-width: 1024px)', true);
  useHydrateAtoms([
    [activeJobAtom, isMobile ? null : activeJob] as [typeof activeJobAtom, Job],
  ]);

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    filterParamsObj,
  } = useJobListingInfQuery();

  return (
    <div className="w-full lg:pl-52 lg:pr-[41.67%]">
      <SideBar />
      <div className="px-3.5 pt-[65px] lg:px-8 lg:pt-0">
        <Filters />
        <JobList
          activeJob={isMobile ? null : activeJob}
          data={data}
          fetchNextPage={fetchNextPage}
          filterParamsObj={filterParamsObj}
          isLoading={isLoading}
          error={error}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default JobListPage;

export const getServerSideProps: GetServerSideProps<Props> = withCSR(
  async (ctx) => {
    const queryClient = new QueryClient();

    const { filterParamsObj } = getFilterFromQuery(ctx.query);

    await queryClient.fetchInfiniteQuery({
      queryKey: ['job-posts', filterParamsObj],
      queryFn: async ({ pageParam, queryKey }) =>
        fetchJobList({ pageParam, queryKey }),
    });

    // Cache individual item from the list
    const initDehydratedState = dehydrate(queryClient);
    const jobPosts = (
      initDehydratedState.queries[0].state.data as any
    ).pages.flatMap((d: JobListQueryPage) => d.data);
    if (jobPosts.length > 0) {
      for (const job of jobPosts) {
        const jobUuid = job.jobpost.shortUUID;
        queryClient.setQueryData(['job-post', jobUuid], job);
      }
    }

    // Dehydrate again to include setup'd cached data
    const dehydratedState = dehydrate(queryClient);
    (dehydratedState.queries[0].state.data as any).pageParams = [null];

    return {
      props: {
        dehydratedState,
        activeJob: jobPosts[0],
      },
    };
  },
);
