import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { NotFoundPage } from '@jobstash/shared/pages';
import { useAtom, useAtomValue } from 'jotai';

import { type ProjectDetails } from '@jobstash/projects/core';
import {
  ERR_INTERNAL,
  type NotFoundInfo,
  ROUTE_SECTION,
} from '@jobstash/shared/core';
import { cn, sentryMessage } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { activeProjectIdAtom } from '@jobstash/projects/state';
import { isOpenTopBannerAtom } from '@jobstash/shared/state';
import { useMobileDisableScrollSyncer } from '@jobstash/shared/state';

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

export interface ProjectDetailsPageProps {
  fromSSR: boolean;
  initProjectDetails: ProjectDetails | null;
  notFoundInfo?: NotFoundInfo;
}

export const ProjectDetailsPage = ({
  fromSSR,
  initProjectDetails,
  notFoundInfo,
}: ProjectDetailsPageProps) => {
  const [activeProjectId, setActiveProjectId] = useAtom(activeProjectIdAtom);

  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

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

  useMobileDisableScrollSyncer({ shouldDisable: true });

  if (notFoundInfo) {
    return <NotFoundPage {...notFoundInfo} />;
  }

  return (
    <PageWrapper>
      <SideBar filtersRouteSection={ROUTE_SECTION.PROJECTS} />

      <div
        className={cn('px-3.5 pt-[212px] lg:px-8 lg:pt-8', {
          'z-50': showFilters,
          'lg:pr-[calc(44vw)]  ': !showFilters,
        })}
      >
        <div
          className={cn({
            'lg:pr-[calc(44vw)]  ': showFilters,
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
          'hide-scrollbar fixed inset-0 h-dvh overflow-y-auto bg-dark px-4 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:pr-10 lg:mt-[100px] lg:h-[calc(100vh-100px)]',
          { 'z-50': !showFilters },
          { '-z-50': showFilters },
          { 'lg:mt-[140px] lg:h-[calc(100vh-140px)]': isOpenTopBanner },
        )}
      >
        <ProjectsRightPanel
          hasTitle
          projectId={initProjectDetails?.id ?? projectId}
          currentTab={tab as string}
        />
      </div>
    </PageWrapper>
  );
};
