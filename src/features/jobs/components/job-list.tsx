import { useRouter } from 'next/router';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  InfiniteData,
  InfiniteQueryObserverBaseResult,
} from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { Loader, Text } from '~/shared/components';
import { getUrlWithFilters, sentryMessage } from '~/shared/utils';

import type { Job, JobListQueryPage } from '../../jobs/core/types';
import { prevLinkAtom } from '../atoms';
import { createJobKey } from '../utils';

import EmptyResult from './empty-result';
import { JobCard } from './job-card';

interface Props {
  initJob?: Job | null;
  activeJob: Job | null;
  data: InfiniteData<JobListQueryPage> | undefined;
  fetchNextPage: InfiniteQueryObserverBaseResult['fetchNextPage'];
  filterParamsObj: Record<string, string>;
  isLoading: boolean;
  error: unknown;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
}

const JobList = ({
  initJob,
  activeJob,
  data,
  fetchNextPage,
  filterParamsObj,
  isLoading,
  error,
  isFetchingNextPage,
  hasNextPage,
}: Props) => {
  // SentryMessage('JobList initJob', JSON.stringify(initJob));
  // sentryMessage('JobList activeJob', JSON.stringify(activeJob));
  // sentryMessage('JobList data', JSON.stringify(data));
  const { push, asPath } = useRouter();

  const jobs = useMemo(() => {
    if (!data) return [];

    let result = data.pages.flatMap((d) => d.data);

    if (initJob) {
      result = result.filter(
        (d) => d.jobpost.shortUUID !== initJob.jobpost.shortUUID,
      );
      result.unshift(initJob);
    }

    return result;
  }, [data, initJob]);

  const [prevLink, setPrevLink] = useAtom(prevLinkAtom);
  useEffect(() => {
    if (jobs.length > 0) {
      setPrevLink(asPath);
    }
  }, [asPath, jobs.length, setPrevLink]);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const isRedirectingRef = useRef(false);
  useEffect(() => {
    if (jobs.length > 0 && !isRedirectingRef.current) {
      isRedirectingRef.current = true;
      const url = getUrlWithFilters(
        filterParamsObj,
        `/jobs/${createJobKey(jobs[0])}/details`,
      );
      push(url, undefined, {
        shallow: true,
      });
    }
  }, [activeJob, filterParamsObj, jobs, push]);

  if (isLoading)
    return (
      <div className="py-4">
        {initJob && (
          <JobCard
            key={initJob.jobpost.shortUUID}
            isActive
            job={initJob}
            filterParamsObj={filterParamsObj}
          />
        )}
        <p>Loading JobList ...</p>
      </div>
    );

  if (error) {
    return <p>error = {(error as Error).message}</p>;
  }

  if (jobs.length === 0) {
    return (
      <div className="py-8">
        <EmptyResult prevLink={prevLink} push={push} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 py-4">
      {jobs.map((job) => (
        <JobCard
          key={job.jobpost.shortUUID}
          job={job}
          isActive={job.jobpost.shortUUID === activeJob?.jobpost.shortUUID}
          filterParamsObj={filterParamsObj}
        />
      ))}
      {jobs.length > 0 && (
        <div ref={ref} className="flex items-center justify-center pb-10">
          {isFetchingNextPage && <Loader />}
          {!hasNextPage && <p>No more job posts to load</p>}
        </div>
      )}
    </div>
  );
};

export default memo(JobList);
