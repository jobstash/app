import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAtom } from 'jotai';

import { HREFS } from '~/shared/core/constants';
import { getQueryClient } from '~/shared/utils/get-query-client';
import { initPathAtom } from '~/shared/atoms/init-path-atom';

import { jobQueryKeys } from '~/jobs/core/query-keys';
import { initJobAtom } from '~/jobs/atoms/init-job-atom';
import { jobTotalCountAtom } from '~/jobs/atoms/job-total-count-atom';

import { useJobListQuery } from './use-job-list-query';

export const useJobList = () => {
  const queryClient = getQueryClient();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isPending,
    isFetching,
  } = useJobListQuery();

  // Sync total job count
  const [totalCount, setTotalCount] = useAtom(jobTotalCountAtom);
  useEffect(() => {
    const currentTotal = data?.pages[0].total ?? 0;
    if (data && currentTotal !== totalCount) {
      setTotalCount(currentTotal);
    }
  }, [data, setTotalCount, totalCount]);

  // For each item on the list is a job-detail - set job-details query
  useEffect(() => {
    if (isSuccess && data) {
      for (const job of data.pages.flatMap((d) => d.data)) {
        queryClient.setQueryData(jobQueryKeys.details(job.shortUUID), job);
        // TODO: If a job-detail has project, prefetch competitors
      }
    }
  });

  // Scroll fetch
  const { ref: inViewRef } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (inView && !error && !isFetching) fetchNextPage();
    },
  });

  const [initPath] = useAtom(initPathAtom);
  const isJobListSSR = initPath === HREFS.JOBS_PAGE;

  const [initJob] = useAtom(initJobAtom);
  const allJobs = data?.pages.flatMap((d) => d.data) ?? [];

  // Dedupe init-card if not job-list ssr
  const jobs = !isJobListSSR
    ? allJobs.filter((d) => d.shortUUID !== initJob?.shortUUID)
    : allJobs;

  return {
    jobs,
    error,
    inViewRef,
    hasNextPage,
    isSuccess,
    isPending,
  };
};
