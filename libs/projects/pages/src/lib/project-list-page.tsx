import dynamic from 'next/dynamic';
import Head from 'next/head';

import { useAtomValue } from 'jotai';

import { type ProjectDetails } from '@jobstash/projects/core';
import { ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { activeProjectIdAtom } from '@jobstash/projects/state';
import { useIsMobile } from '@jobstash/shared/state';

import { PageWrapper } from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

const ProjectList = dynamic(() =>
  import('@jobstash/projects/feature').then((m) => m.ProjectList),
);

const ProjectsRightPanel = dynamic(() =>
  import('@jobstash/projects/feature').then((m) => m.ProjectsRightPanel),
);

interface Props {
  initActiveProject: ProjectDetails | null;
}

export const ProjectListPage = ({ initActiveProject }: Props) => {
  const activeProjectId = useAtomValue(activeProjectIdAtom);
  const showFilters = useAtomValue(showFiltersAtom);
  const isMobile = useIsMobile();

  return (
    <>
      <Head>
        <title>Crypto Projects</title>
      </Head>
      <PageWrapper>
        <SideBar filtersRouteSection={ROUTE_SECTION.PROJECTS} />

        <div
          className={cn('px-3.5 pt-[65px] lg:px-8 lg:pt-8 lg:pr-[calc(44vw)]')}
        >
          {/* <div
            className={cn({
              'lg:pr-[calc(44vw)]  ': showFilters,
            })}
          > */}
            <ProjectList initProject={null} activeProjectId={activeProjectId} />
          {/* </div> */}
        </div>

        {activeProjectId && !isMobile && (
          <div
            className={cn(
              'hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10 lg:mt-[100px]')}
          >
            <ProjectsRightPanel
              projectId={initActiveProject?.id ?? activeProjectId}
              currentTab={TAB_SEGMENT.details}
            />
          </div>
        )}
      </PageWrapper>
    </>
  );
};
