'use client';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { useIsDesktop } from '~/shared/hooks/use-media-query';

import { activeJobIdAtom } from '~/jobs/atoms/active-job-id-atom';
import { initJobAtom } from '~/jobs/atoms/init-job-atom';
import { useJobDetails } from '~/jobs/hooks/use-job-details';

interface Props {
  id: string;
}

export const InitJobDetailsSyncer = ({ id }: Props) => {
  const [activeJobId, setActiveJobId] = useAtom(activeJobIdAtom);
  const [initJob, setInitJob] = useAtom(initJobAtom);

  const isDesktop = useIsDesktop();

  const { data } = useJobDetails(id);

  // Initialize job details
  useEffect(() => {
    if (!initJob && data) {
      setInitJob(data);
    }
  }, [data, initJob, setInitJob]);

  // Set active job ID on desktop
  useEffect(() => {
    if (isDesktop && !activeJobId && data) {
      setActiveJobId(data.shortUUID);
    }
  }, [activeJobId, data, isDesktop, setActiveJobId]);

  return null;
};
