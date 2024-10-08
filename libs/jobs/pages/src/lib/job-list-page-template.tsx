import dynamic from 'next/dynamic';
import Head from 'next/head';

import { PrimitiveAtom, useAtomValue } from 'jotai';

import { JobPost } from '@jobstash/jobs/core';
import { RIGHT_PANEL_WRAPPER_ID } from '@jobstash/right-panel/core';
import { JobsRouteSection } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { useIsDesktop } from '@jobstash/shared/state';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { PageWrapper } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

const JobList = dynamic(() =>
  import('@jobstash/jobs/feature').then((m) => m.JobList),
);

const JobsRightPanel = dynamic(() =>
  import('@jobstash/jobs/feature').then((m) => m.JobsRightPanel),
);

interface JobsPageTemplateProps {
  title: string;
  routeSection: JobsRouteSection;
  jobCountAtom: PrimitiveAtom<number | null>;
  activeJobAtom: PrimitiveAtom<JobPost | null>;
  access?: JobPost['access'];
}

export const JobListPageTemplate: React.FC<JobsPageTemplateProps> = ({
  title,
  routeSection,
  access,
  jobCountAtom,
  activeJobAtom,
}) => {
  const activeJob = useAtomValue(activeJobAtom);
  const isDesktop = useIsDesktop();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <PageWrapper>
        <SideBar filtersRouteSection={routeSection} />

        <div
          className={cn('px-3.5 pt-[212px] lg:px-8 lg:pt-8 lg:pr-[calc(44vw)]')}
        >
          <JobList
            initJob={null}
            jobCountAtom={jobCountAtom}
            activeJobAtom={activeJobAtom}
            access={access}
          />
        </div>

        {activeJob && isDesktop && (
          <div
            id={RIGHT_PANEL_WRAPPER_ID}
            className={cn(
              'hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10 lg:mt-[100px]',
            )}
          >
            <JobsRightPanel
              jobPost={activeJob}
              currentTab="details"
              routeSection={routeSection}
            />
          </div>
        )}
      </PageWrapper>
    </>
  );
};
