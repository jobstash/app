import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAtom, useSetAtom } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';
import { FRONTEND_URL } from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';
import { createFilterParamsObj, createJobKey } from '@jobstash/jobs/utils';

import { useIsMobile } from '@jobstash/shared/state';

import { activeJobAtom } from '../atoms/active-job-atom';
import { jobCountAtom } from '../atoms/job-count-atom';
import { jobsPrevLinkAtom } from '../atoms/jobs-prev-link';

import { useJobListQuery } from './use-job-list-query';
export const useJobList = (initJob: JobPost | null) => {
  const [activeJob, setActiveJob] = useAtom(activeJobAtom);

  const { push, query, asPath } = useRouter();

  const filterParamsObj = createFilterParamsObj(query);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useJobListQuery();

  const setJobCountAtom = useSetAtom(jobCountAtom);
  useEffect(() => {
    if (data) {
      setJobCountAtom(data.pages[0].total);
    }
  }, [data, setJobCountAtom]);

  const initJobRef = useRef<JobPost | null>(null);
  const jobPosts = useMemo(() => {
    if (!data) return [];

    let result = data.pages.flatMap((d) => d.data);

    if (initJob) {
      result = result.filter((d) => d.shortUUID !== initJob.shortUUID);
      result.unshift(initJob);
      initJobRef.current = initJob;
    }

    if (initJobRef.current) {
      result = result.filter(
        (d) => d.shortUUID !== initJobRef.current?.shortUUID,
      );
      result.unshift(initJobRef.current);
    }

    return result;
  }, [data, initJob]);

  const setActiveRef = useRef(false);
  useEffect(() => {
    if (jobPosts.length > 0 && !setActiveRef.current) {
      setActiveRef.current = true;
      setActiveJob(jobPosts[0]);
    }
  }, [activeJob, jobPosts, setActiveJob]);

  const [jobsPrevLink, setPrevLink] = useAtom(jobsPrevLinkAtom);
  useEffect(() => {
    if (jobPosts.length > 0) {
      setPrevLink(asPath);
    }
  }, [asPath, jobPosts.length, setPrevLink]);

  const { ref: inViewRef, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const isRedirectingRef = useRef(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (
      jobPosts.length > 0 &&
      !isRedirectingRef.current &&
      !isMobile &&
      asPath === '/jobs'
    ) {
      isRedirectingRef.current = true;
      const url = getUrlWithParams(
        FRONTEND_URL,
        `/jobs/${createJobKey(jobPosts[0])}/details`,
        filterParamsObj,
      );

      push(url, undefined, {
        shallow: true,
      });
    }
  }, [asPath, filterParamsObj, isMobile, jobPosts, push]);

  return {
    push,
    isLoading,
    error,
    jobPosts,
    jobsPrevLink,
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
    filterParamsObj,
  };
};
