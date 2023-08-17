import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import { type ProjectDetails } from '@jobstash/projects/core';
import {
  ERR_INTERNAL,
  ROUTE_SECTION,
  TAB_SEGMENT,
} from '@jobstash/shared/core';
import { cn, sentryMessage } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { activeProjectIdAtom } from '@jobstash/projects/state';

const Filters = dynamic(() =>
  import('@jobstash/filters/feature').then((m) => m.Filters),
);

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
  fromSSR: boolean;
  initProjectDetails: ProjectDetails | null;
}

export const ProjectDetailsPage = ({ fromSSR, initProjectDetails }: Props) => {
  const [activeProjectId, setActiveProjectId] = useAtom(activeProjectIdAtom);

  useEffect(() => {
    if (initProjectDetails && !activeProjectId) {
      setActiveProjectId(initProjectDetails.id);
    }
  }, [activeProjectId, initProjectDetails, setActiveProjectId]);

  // Prevent scroll restore when directly accessed from address-bar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = fromSSR ? 'manual' : 'auto';
    }
  }, [fromSSR]);

  const { query } = useRouter();
  const { slug, tab } = query;
  if (!slug || !tab) {
    sentryMessage(
      'ProjectDetailsPage: missing router.query definitions',
      `slug = "${slug}", tab = "${tab}"`,
    );

    throw new Error(ERR_INTERNAL);
  }

  // Get projectId from url or initProjectDetails
  const projectId = useMemo(() => {
    if (initProjectDetails) {
      return initProjectDetails.id;
    }

    return (slug as string).slice(-36) ?? null;
  }, [initProjectDetails, slug]);

  const showFilters = useAtomValue(showFiltersAtom);

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
          <Filters routeSection={ROUTE_SECTION.PROJECTS} />
        </div>

        <div
          className={cn({
            'lg:pr-[50%]': showFilters,
          })}
        >
          <ProjectList
            initProject={initProjectDetails}
            activeProjectId={activeProjectId}
          />
        </div>
      </div>

      <div
        className={cn(
          'hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10',
          { 'z-50': !showFilters },
          { '-z-50': showFilters },
        )}
      >
        <ProjectsRightPanel
          projectId={initProjectDetails?.id ?? projectId}
          currentTab={tab as string}
        />
      </div>
    </div>
  );
};