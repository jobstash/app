/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dispatch, useCallback, useEffect, useRef, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SetStateAction } from 'jotai';

import { notifSuccess } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { getJobPost } from '@jobstash/jobs/data';

const POLL_INTERVAL = 5000; // 5 seconds
const POLL_TIME_LIMIT = 5 * 60 * 1000; // 5 minutes

const PROMOTED_TITLE = 'Job has been promoted!';
const PROMOTED_MESSAGE = 'The job will be featured for the next 7 days.';
const EXTENDED_TITLE = 'Job promotion has been extended!';
const EXTENDED_MESSAGE = 'The job will be featured for another 7 days.';

interface Props {
  id: string;
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  isProtected: boolean;
  filterParams: Record<string, string>;
  endDate: number | null;
}

export const useJobPromotePoll = ({
  id,
  enabled,
  setEnabled,
  isProtected,
  filterParams,
  endDate,
}: Props) => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  const [shouldStop, setShouldStop] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopPoll = useCallback(() => {
    setShouldStop(true);
    setEnabled(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [setEnabled]);

  const isEnabled = enabled && !shouldStop;

  const { data } = useQuery({
    queryKey: [mwVersion, 'job-promote', id],
    queryFn: () => getJobPost({ shortUuid: id }),
    refetchInterval: isEnabled ? POLL_INTERVAL : false,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    enabled: isEnabled,
  });

  // Timeout
  useEffect(() => {
    if (isEnabled) {
      timeoutRef.current = setTimeout(() => {
        stopPoll();
      }, POLL_TIME_LIMIT);
    }

    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, [isEnabled, stopPoll]);

  const [isUpdating, setIsUpdating] = useState(false);
  const updateJobList = useCallback(async () => {
    setIsUpdating(true);
    //
    // queryClient.setQueryData<InfiniteData<JobListQueryPage, number>>(
    //   [mwVersion, 'job-posts', filterParams, isProtected],
    //   (oldData) => {
    //     if (!oldData) return oldData;

    //     const updatedPages = oldData.pages.map((page) => ({
    //       ...page,
    //       data: page.data.map((job) => {
    //         if (job.shortUUID === id) {
    //           return {
    //             ...job,
    //             featured: true,
    //           };
    //         }

    //         return job;
    //       }),
    //     }));

    //     return {
    //       ...oldData,
    //       pages: updatedPages,
    //     };
    //   },
    // );

    await queryClient.invalidateQueries({
      queryKey: [mwVersion, 'job-posts', filterParams, isProtected],
    });

    setIsUpdating(false);

    notifSuccess({
      title: data?.featured ? EXTENDED_TITLE : PROMOTED_TITLE,
      message: data?.featured ? EXTENDED_MESSAGE : PROMOTED_MESSAGE,
      autoClose: 8000,
    });
  }, [data?.featured, filterParams, isProtected, mwVersion, queryClient]);

  // Exit poll
  useEffect(() => {
    if (data && data.featureEndDate !== endDate && isEnabled) {
      stopPoll();
      updateJobList();
    }
  }, [data, endDate, isEnabled, stopPoll, updateJobList]);

  return { isEnabled, isUpdating };
};
