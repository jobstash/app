import Link from 'next/link';
import { memo, ReactNode, useCallback, useMemo } from 'react';

import { cva } from 'class-variance-authority';
import { useSetAtom } from 'jotai';

import { createJobKey } from '~/features/jobs/utils';
import {
  TEXT_ROUTE_SECTION_JOBS,
  TEXT_ROUTE_TAB_DETAILS,
} from '~/shared/core/constants';
import { createRouteString } from '~/shared/utils';

import type { Job } from '../../../jobs/core/types';
import { activeJobAtom } from '../../atoms';

interface Props {
  job: Job;
  isActive: boolean;
  children: ReactNode;
  filterParams: string;
  shouldScroll?: boolean;
}

const jobCard = cva(
  [
    'flex flex-col p-6 gap-2.5 rounded-3xl bg-white/5 my-8',
    'cursor-pointer hover:bg-white/10',
    'transition-all hover:ring-1 hover:ring-inset hover:ring-white/20',
  ],
  {
    variants: {
      isActive: {
        true: 'bg-gradient-to-l from-primary to-tertiary hover:after:hidden cursor-default hover:ring-0',
      },
    },
  },
);

const JobCardWrapper = ({
  job,
  isActive,
  children,
  filterParams,
  shouldScroll = false,
}: Props) => {
  const route = useMemo(
    () =>
      `${createRouteString(
        TEXT_ROUTE_SECTION_JOBS,
        createJobKey(job),
        TEXT_ROUTE_TAB_DETAILS,
      )}${filterParams ? '?' + filterParams : ''}`,
    [filterParams, job],
  );

  const setActiveJob = useSetAtom(activeJobAtom);

  const onClick = useCallback(() => {
    setActiveJob(job);
  }, [job, setActiveJob]);

  return (
    <Link
      shallow
      href={route}
      scroll={shouldScroll}
      prefetch={false}
      onClick={onClick}
    >
      <div className={jobCard({ isActive })}>{children}</div>
    </Link>
  );
};

export default memo(JobCardWrapper);
