import type { GetServerSideProps } from 'next';
import { useEffect, useRef } from 'react';

import { useAtom } from 'jotai';

import { activeJobAtom } from '~/features/jobs/atoms';
import JobList from '~/features/jobs/components/job-list';
import { Job } from '~/features/jobs/core/types';
import { JobRightPanel } from '~/features/right-panel/components';
import { SideBar } from '~/features/sidebar/components';
import { ERR_INTERNAL } from '~/shared/core/constants';
import { sentryMessage } from '~/shared/utils';

interface Props {
  data: {
    initJob: Job;
  };
}

const JobsPage = ({ data: { initJob } }: Props) => {
  const [activeJob, setActiveJob] = useAtom(activeJobAtom);
  const initRef = useRef(false);

  // Sync SSR data active post
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      setActiveJob(initJob);
    }
  }, [initJob, setActiveJob]);

  return (
    <div className="w-full pl-52 pr-[41.67%]">
      <SideBar />

      <div className="px-8">
        <JobList initJob={initJob} activeJob={activeJob} />
      </div>
    </div>
  );
};

export default JobsPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const mwURL = process.env['NEXT_PUBLIC_MW_URL'];
  if (!mwURL) {
    sentryMessage('/jobs/{shortUUID} Missing env', 'NEXT_PUBLIC_MW_URL');
    throw new Error(ERR_INTERNAL);
  }

  const shortUUID = ctx.query.key?.slice(-6);
  if (!shortUUID) return { notFound: true };

  const res = await fetch(`${mwURL}/jobs/details/${shortUUID}`);
  if (!res.ok) return { notFound: true };

  const initJob = (await res.json()) as Job;

  return {
    props: {
      data: {
        initJob,
      },
    },
  };
};
