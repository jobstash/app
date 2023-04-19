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
import { fetchJob, fetchJobList } from '~/features/jobs/fetch';
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
  const [activeJob, setActiveJob] = useAtom(activeJobAtom);
  const initRef = useRef(false);

  const router = useRouter();
  const shortUuid = (router.query.key?.slice(-6) as string) ?? '';

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
    if (!initRef.current && jobPost) {
      initRef.current = true;
      setActiveJob(jobPost);
    }
  }, [jobPost, setActiveJob]);

  return (
    <div className="w-full pl-52 pr-[41.67%]">
      <SideBar />

      <div className="px-8">
        <Filters />
        <JobList initJob={initJob} activeJob={activeJob ?? initJob} />
      </div>

      <div className="fixed right-0 top-0 z-10 w-5/12">
        <div className="hide-scrollbar sticky top-0 h-screen space-y-6 overflow-y-scroll bg-dark px-6 py-8 pr-10">
          <JobRightPanel activeJob={activeJob} />
        </div>
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

    const initJob = await fetch(`${mwURL}/jobs/details/${shortUuid}`).then(
      (r) => {
        if (!r.ok) {
          sentryMessage('/jobs/{shortUuid} fetch job-post', '!res.ok');
          throw new Error(ERR_INTERNAL);
        }

        return r.json();
      },
    );

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
    let jobInList = false;
    for (const job of jobPosts) {
      const jobUuid = job.jobpost.shortUUID;
      queryClient.setQueryData(['job-post', jobUuid], job);

      if (jobUuid === shortUuid) {
        jobInList = true;
      }
    }

    if (!jobInList) {
      await queryClient.fetchQuery({
        queryKey: ['job-post', shortUuid],
        queryFn: () => fetchJob(shortUuid),
      });
    }

    // Dehydrate again to include setup'd cached data
    const dehydratedState = dehydrate(queryClient);
    (dehydratedState.queries[0].state.data as any).pageParams = [null];

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
