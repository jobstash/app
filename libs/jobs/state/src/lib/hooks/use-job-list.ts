import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';
import { createJobsFilterParamsObj } from '@jobstash/jobs/utils';
import { getLSMwVersion } from '@jobstash/shared/utils';

import { useIsMobile } from '@jobstash/shared/state';
import { getCompetitors } from '@jobstash/competitors/data';

import { activeJobAtom } from '../atoms/active-job-atom';
import { jobCountAtom } from '../atoms/job-count-atom';
import { jobsPrevLinkAtom } from '../atoms/jobs-prev-link';

import { useJobListQuery } from './use-job-list-query';
export const useJobList = (initJob: JobPost | null) => {
  const queryClient = useQueryClient();

  const [activeJob, setActiveJob] = useAtom(activeJobAtom);

  const { push, query, asPath } = useRouter();

  const filterParamsObj = createJobsFilterParamsObj(query);

  const {
    data,
    isLoading,
    isSuccess,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useJobListQuery();

  const mwVersion = getLSMwVersion();

  // Prefetch job items
  // (react-query breaking change v5 - removed onSuccess)
  useEffect(() => {
    if (data && isSuccess) {
      const jobPosts = data.pages.flatMap((d) => d.data);
      for (const job of jobPosts) {
        queryClient.setQueryData(['job-post', job.shortUUID], job);
        if (job.organization.projects.length > 0) {
          const projectId = job.organization.projects[0].id;
          queryClient.prefetchQuery({
            queryKey: [mwVersion, 'competitors', projectId],
            queryFn: () => getCompetitors(job.organization.projects[0].id),
          });
        }
      }
    }
  }, [data, isSuccess, mwVersion, queryClient]);

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
  const isMobile = useIsMobile();
  useEffect(() => {
    if (
      jobPosts.length > 0 &&
      !setActiveRef.current &&
      !activeJob &&
      !isMobile
    ) {
      setActiveRef.current = true;
      setActiveJob(jobPosts[0]);
    }
  }, [activeJob, isMobile, jobPosts, setActiveJob]);

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
