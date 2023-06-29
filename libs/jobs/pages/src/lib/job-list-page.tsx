import dynamic from 'next/dynamic';

import { useAtomValue } from 'jotai';

import { cn } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { activeJobAtom } from '@jobstash/jobs/state';
import { useIsMobile } from '@jobstash/shared/state';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

const JobList = dynamic(() =>
  import('@jobstash/jobs/feature').then((m) => m.JobList),
);

const Filters = dynamic(() =>
  import('@jobstash/filters/feature').then((m) => m.Filters),
);

const JobsRightPanel = dynamic(() =>
  import('@jobstash/jobs/feature').then((m) => m.JobsRightPanel),
);

export const JobListPage = () => {
  const activeJob = useAtomValue(activeJobAtom);
  const showFilters = useAtomValue(showFiltersAtom);
  const isMobile = useIsMobile();

  return (
    <div className="w-full lg:pl-52">
      <SideBar />

      <div
        className={cn('px-3.5 pt-[65px] lg:px-8 lg:pt-0', {
          'z-50': showFilters,
          'lg:pr-[50%]': !showFilters,
        })}
      >
        <div
          className={cn({
            'bg-[#121216] w-[101%] pr-12': showFilters,
          })}
        >
          <Filters />
        </div>

        <div
          className={cn({
            'lg:pr-[50%]': showFilters,
          })}
        >
          <JobList initJob={null} activeJob={activeJob} />
        </div>
      </div>

      {activeJob && !isMobile && (
        <div
          className={cn(
            'hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10',
            { 'z-50': !showFilters },
            { '-z-50': showFilters },
          )}
        >
          <JobsRightPanel jobPost={activeJob} currentTab="details" />
        </div>
      )}
    </div>
  );
};
