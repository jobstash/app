import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useQueryClient } from '@tanstack/react-query';

import { useMwVersionContext } from '@jobstash/shared/state';

import { useOrgJobListQuery } from './use-org-job-list-query';

export const useOrgJobList = (orgId: string) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const {
    data,
    isLoading,
    isSuccess,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useOrgJobListQuery(orgId);

  // Prefetch job items
  useEffect(() => {
    if (data && isSuccess) {
      const jobPosts = data.pages.flatMap((d) => d.data);
      for (const job of jobPosts) {
        queryClient.setQueryData([mwVersion, 'job-post', job.shortUUID], job);
      }
    }
  }, [data, isSuccess, mwVersion, queryClient]);

  const { ref: inViewRef, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return {
    isLoading,
    error,
    jobPosts: data?.pages.flatMap((d) => d.data) || [],
    isFetchingNextPage,
    hasNextPage,
    inViewRef,
  };
};
