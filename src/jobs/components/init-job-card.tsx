'use client';

import { usePathname } from 'next/navigation';

import { useAtomValue } from 'jotai';

import { HREFS } from '~/shared/core/constants';
import { initPathAtom } from '~/shared/atoms/init-path-atom';
import { CardSkeleton } from '~/shared/components/card-skeleton';

import { initJobAtom } from '~/jobs/atoms/init-job-atom';

import { JobCard } from './job-card';

interface Props {
  filterParamsString: string;
}

export const InitJobCard = ({ filterParamsString }: Props) => {
  const pathname = usePathname();

  const initPath = useAtomValue(initPathAtom);
  const initJob = useAtomValue(initJobAtom);

  // Do not render if initially in /jobs
  if (initPath === HREFS.JOBS_PAGE) return null;

  // Do not render if on /jobs page and no initJob
  if (!initJob && pathname === HREFS.JOBS_PAGE) return null;

  // Render initJob if set
  if (initJob)
    return (
      <JobCard isInit job={initJob} filterParamsString={filterParamsString} />
    );

  // Defaults to a skeleton
  return <CardSkeleton />;
};
