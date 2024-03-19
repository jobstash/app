import dynamic from 'next/dynamic';
import Head from 'next/head';

import { useAtomValue } from 'jotai';

import { ROUTE_SECTION } from '@jobstash/shared/core';
import { createJobPageTitle } from '@jobstash/jobs/utils';
import { cn } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { activeJobAtom } from '@jobstash/jobs/state';
import { useIsMobile } from '@jobstash/shared/state';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { PageWrapper } from '@jobstash/shared/ui';

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
    <>
      <Head>
        <title>Crypto Jobs</title>
      </Head>

      <PageWrapper>
        <SideBar />

        <div
          className={cn('px-3.5 pt-[212px] lg:px-8 lg:pt-8', {
            'z-50': showFilters,
            'lg:pr-[calc(44vw)]  ': !showFilters,
          })}
        >
          {/* <Filters routeSection={ROUTE_SECTION.JOBS} /> */}

          <div
            className={cn({
              'lg:pr-[calc(44vw)]  ': showFilters,
            })}
          >
            <JobList initJob={null} activeJob={activeJob} />
          </div>
        </div>

        {activeJob && !isMobile && (
          <div
            className={cn(
              'hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10 lg:mt-[100px]',
              { 'z-50': !showFilters },
              { '-z-50': showFilters },
            )}
          >
            <JobsRightPanel jobPost={activeJob} currentTab="details" />
          </div>
        )}
      </PageWrapper>
    </>
  );
};
