import Link from 'next/link';
import { memo, ReactNode, useCallback, useMemo } from 'react';

import { cva } from 'class-variance-authority';
import { useSetAtom } from 'jotai';

import { createJobKey } from '~/features/jobs/utils';
import { EVENT_CARD_CLICK } from '~/shared/core/constants';
import { getUrlWithFilters } from '~/shared/utils';

import type { JobListResult } from '../../../jobs/core/types';
import { activeJobAtom } from '../../atoms';

interface Props {
  jobListResult: JobListResult;
  isActive: boolean;
  children: ReactNode;
  filterParamsObj: Record<string, string>;
  shouldScroll?: boolean;
}

const jobCard = cva(
  [
    'flex flex-col p-6 gap-2.5 rounded-3xl bg-white/5 lg:mb-8',
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
  jobListResult,
  isActive,
  children,
  filterParamsObj,
  shouldScroll = false,
}: Props) => {
  const route = useMemo(() => {
    const url = getUrlWithFilters(
      filterParamsObj,
      `/jobs/${createJobKey(jobListResult)}/details`,
    );

    return url.toString();
  }, [filterParamsObj, jobListResult]);

  const setActiveJob = useSetAtom(activeJobAtom);

  const onClick = useCallback(() => {
    setActiveJob(jobListResult);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));
  }, [jobListResult, setActiveJob]);

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
