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

import { Job } from '../../../jobs/core/types';
import { activeJobAtom } from '../../atoms';

interface Props {
  job: Job;
  isActive: boolean;
  children: ReactNode;
}

const jobCard = cva(
  [
    'flex flex-col p-6 gap-2.5 rounded-3xl bg-white/5 my-8',
    'cursor-pointer hover:bg-white/10',
    'border border-transparent hover:border-white/20',
  ],
  {
    variants: {
      isActive: {
        true: 'bg-gradient-to-l from-primary to-tertiary hover:after:hidden cursor-default border border-box border-none p-[25px] hover:border-transparent',
      },
    },
  },
);

const JobCardWrapper = ({ job, isActive, children }: Props) => {
  const route = useMemo(
    () =>
      createRouteString(
        TEXT_ROUTE_SECTION_JOBS,
        createJobKey(job),
        TEXT_ROUTE_TAB_DETAILS,
      ),
    [job],
  );

  const setActiveJob = useSetAtom(activeJobAtom);

  const onClick = useCallback(() => {
    setActiveJob(job);
  }, [job, setActiveJob]);

  return (
    <Link
      shallow
      href={route}
      scroll={false}
      prefetch={false}
      onClick={onClick}
    >
      <div className={jobCard({ isActive })}>{children}</div>
    </Link>
  );
};

export default memo(JobCardWrapper);
