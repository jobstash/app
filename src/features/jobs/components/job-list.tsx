import { useRouter } from 'next/router';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  InfiniteData,
  InfiniteQueryObserverBaseResult,
} from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { Loader, Text } from '~/shared/components';
import { useMediaQuery } from '~/shared/hooks';
import { getUrlWithFilters } from '~/shared/utils';

import type { JobListQueryPage, JobListResult } from '../../jobs/core/types';
import { prevLinkAtom } from '../atoms';
import { createJobKey } from '../utils';

import EmptyResult from './empty-result';
import { JobCard } from './job-card';

interface Props {
  initJob?: JobListResult | null;
  activeJob: JobListResult | null;
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

  const jobListResults = useMemo(() => {
    if (!data) return [];

    let result = data.pages.flatMap((d) => d.data);

    if (initJob) {
      result = result.filter((d) => d.shortUUID !== initJob.shortUUID);
      result.unshift(initJob);
    }

    return result;
  }, [data, initJob]);

  const [prevLink, setPrevLink] = useAtom(prevLinkAtom);
  useEffect(() => {
    if (jobListResults.length > 0) {
      setPrevLink(asPath);
    }
  }, [asPath, jobListResults.length, setPrevLink]);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const isRedirectingRef = useRef(false);
  const isMobile = useMediaQuery('(max-width: 1024px)', true);
  useEffect(() => {
    if (jobListResults.length > 0 && !isRedirectingRef.current && !isMobile) {
      isRedirectingRef.current = true;
      const url = getUrlWithFilters(
        filterParamsObj,
        `/jobs/${createJobKey(jobListResults[0])}/details`,
      );
      push(url, undefined, {
        shallow: true,
      });
    }
  }, [activeJob, filterParamsObj, isMobile, jobListResults, push]);

  if (isLoading)
    return (
      <div className="py-4">
        {initJob && (
          <JobCard
            key={initJob.shortUUID}
            isActive
            jobListResult={initJob}
            filterParamsObj={filterParamsObj}
          />
        )}
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      </div>
    );

  if (jobListResults.length === 0) {
    return (
      <div className="py-8">
        <EmptyResult prevLink={prevLink} push={push} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 py-4" id="JOB-LIST">
      {jobListResults.map((job) => (
        <JobCard
          key={job.shortUUID}
          jobListResult={job}
          isActive={job.shortUUID === activeJob?.shortUUID}
          filterParamsObj={filterParamsObj}
        />
      ))}
      {jobListResults.length > 0 && (
        <div ref={ref} className="flex items-center justify-center pb-10">
          {isFetchingNextPage && <Loader />}
          {!hasNextPage && <p>No more job posts to load</p>}
        </div>
      )}
      {(error as Error)?.message && (
        <div className="py-8">
          <p>error = {(error as Error).message}</p>
        </div>
      )}
    </div>
  );
};

export default memo(JobList);
