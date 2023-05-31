import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAtom, useAtomValue } from 'jotai';

import { getUrlWithParams } from '@jobstash/filters/utils';
import { createFilterParamsObj, createJobKey } from '@jobstash/jobs/utils';
import { getFrontendUrl } from '@jobstash/shared/utils';

import { useIsMobile } from '@jobstash/shared/state';

import { activeJobAtom } from '../atoms/active-job-atom';
import { initJobAtom } from '../atoms/init-job-atom';
import { jobsPrevLinkAtom } from '../atoms/jobs-prev-link';

import { useJobListQuery } from './use-job-list-query';
export const useJobList = () => {
  const initJobAtomValue = useAtomValue(initJobAtom);
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

  const jobPosts = useMemo(() => {
    if (!data) return [];

    let result = data.pages.flatMap((d) => d.data);

    // Put initJob as first job in list
    if (initJobAtomValue) {
      result = result.filter((d) => d.shortUUID !== initJobAtomValue.shortUUID);
      result.unshift(initJobAtomValue);
    }

    return result;
  }, [data, initJobAtomValue]);

  useEffect(() => {
    if (jobPosts.length > 0 && !activeJob) {
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
  const frontendUrl = getFrontendUrl();
  useEffect(() => {
    if (jobPosts.length > 0 && !isRedirectingRef.current && !isMobile) {
      isRedirectingRef.current = true;
      const url = getUrlWithParams(
        frontendUrl,
        `/jobs/${createJobKey(jobPosts[0])}/details`,
        filterParamsObj,
      );

      push(url, undefined, {
        shallow: true,
      });
    }
  }, [filterParamsObj, frontendUrl, isMobile, jobPosts, push]);

  return {
    push,
    data,
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
