import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import NProgress from 'nprogress';

import { Filters } from '~/features/filters/components';
import { getFilterFromQuery } from '~/features/filters/utils';
import { activeJobAtom } from '~/features/jobs/atoms';
import JobList from '~/features/jobs/components/job-list';
import { Job } from '~/features/jobs/core/types';
import { fetchJobList } from '~/features/jobs/fetch';
import { useJobListingInfQuery } from '~/features/jobs/hooks';
import { useJobQuery } from '~/features/jobs/hooks/use-job-query';
import { JobRightPanel } from '~/features/right-panel/components';
import { SideBar } from '~/features/sidebar/components';
import { ERR_INTERNAL } from '~/shared/core/constants';
import { withCSR } from '~/shared/hocs';
import { sentryMessage } from '~/shared/utils';

interface Props {
  data: {
    //
    initJob: Job | null;
    fromSSR?: boolean;
  };
}

const JobsPage = ({ data: { initJob, fromSSR } }: Props) => {
  // SentryMessage('JobsPage initJob', JSON.stringify(initJob));
  // sentryMessage('JobsPage fromSSR', JSON.stringify(fromSSR));

  const [activeJob, setActiveJob] = useAtom(activeJobAtom);
  const initRef = useRef(false);

  const router = useRouter();
  const shortUuid = (router.query.key?.slice(-6) as string) ?? '';
  // SentryMessage('JobsPage shortUuid', JSON.stringify(shortUuid));

  const { data: jobPost } = useJobQuery(shortUuid, Boolean(shortUuid), (data) =>
    setActiveJob(data),
  );

  useEffect(() => {
    // Prevent scroll restore when directly accessed from address-bar
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = fromSSR ? 'manual' : 'auto';
    }

    // Complete nProgress when routed from /jobs
    if (!fromSSR) {
      NProgress.done();
    }
  }, [fromSSR]);

  // Sync SSR data active post
  useEffect(() => {
    if (!initRef.current && !initJob && jobPost) {
      initRef.current = true;
      setActiveJob(jobPost);
      // SentryMessage('JobsPage useEffect setActiveJob', JSON.stringify(jobPost));
    }
  }, [initJob, jobPost, setActiveJob]);

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
        <Filters jobCount={data?.pages[0].total} />
        <JobList
          initJob={initJob}
          activeJob={activeJob ?? initJob}
          data={data}
          fetchNextPage={fetchNextPage}
          filterParamsObj={filterParamsObj}
          isLoading={isLoading}
          error={error}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
      <div
        className={
          'fixed inset-0 z-50 h-screen overflow-y-auto bg-dark p-4 lg:right-0 transition-all lg:top-0 lg:hide-scrollbar lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10 lg:inset-auto' +
          (activeJob === initJob ? 'active' : '')
        }
      >
        <JobRightPanel job={jobPost} />
      </div>
    </div>
  );
};

export default JobsPage;

export const getServerSideProps: GetServerSideProps<Props> = withCSR(
  async (ctx) => {
    const mwURL = process.env['NEXT_PUBLIC_MW_URL'];
    if (!mwURL) {
      sentryMessage('/jobs/{shortUuid} Missing env', 'NEXT_PUBLIC_MW_URL');
      throw new Error(ERR_INTERNAL);
    }

    const shortUuid = ctx.query.key?.slice(-6) as string;
    if (!shortUuid) return { notFound: true };
    // SentryMessage('getServerSideProps shortUuid', shortUuid);

    const initJob = await fetch(`${mwURL}/jobs/details/${shortUuid}`).then(
      (r) => {
        if (!r.ok) {
          sentryMessage('/jobs/{shortUuid} fetch job-post', '!res.ok');
          throw new Error(ERR_INTERNAL);
        }

        return r.json();
      },
    );
    // SentryMessage('getServerSideProps initJob', JSON.stringify(initJob));

    const queryClient = new QueryClient();

    const { filterParamsObj } = getFilterFromQuery(ctx.query);
    await queryClient.fetchInfiniteQuery({
      queryKey: ['job-posts', filterParamsObj],
      queryFn: async ({ pageParam, queryKey }) =>
        fetchJobList({ pageParam, queryKey }),
    });

    // Cache individual item from the list
    const initDehydratedState = dehydrate(queryClient);
    const jobPosts = (initDehydratedState.queries[0].state.data as any).pages[0]
      .data as Job[];
    let jobInList = false;
    if (jobPosts.length > 0) {
      for (const job of jobPosts) {
        const jobUuid = job.jobpost.shortUUID;
        queryClient.setQueryData(['job-post', jobUuid], job);

        if (jobUuid === shortUuid) {
          jobInList = true;
        }
      }
    }

    // SentryMessage('getServerSideProps jobPosts', JSON.stringify(jobPosts));
    // sentryMessage('getServerSideProps jobInList', JSON.stringify(jobInList));

    if (!jobInList) {
      queryClient.setQueryData(
        ['job-post', initJob.jobpost.shortUUID],
        initJob,
      );
    }

    // Dehydrate again to include setup'd cached data
    const dehydratedState = dehydrate(queryClient);
    (dehydratedState.queries[0].state.data as any).pageParams = [null];
    // SentryMessage(
    //   'getServerSideProps dehydratedState-jobList',
    //   JSON.stringify(
    //     (dehydratedState.queries[0].state.data as any).pages[0].data as Job[],
    //   ),
    // );

    return {
      props: {
        dehydratedState,
        data: {
          initJob,
          fromSSR: true,
        },
      },
    };
  },
  { props: { data: { initJob: null, fromSSR: false } } },
);
