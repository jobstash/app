import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';

import { JobPost } from '@jobstash/jobs/core';
import { RIGHT_PANEL_WRAPPER_ID } from '@jobstash/right-panel/core';
import {
  EDGE_URL,
  ERR_INTERNAL,
  FRONTEND_URL,
  JobsRouteSection,
  type NotFoundInfo,
  ROUTE_SECTION,
} from '@jobstash/shared/core';
import {
  createJobCardOgDetails,
  createJobPostLdJson,
} from '@jobstash/jobs/utils';
import { cn, sentryMessage } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { useJobPost } from '@jobstash/jobs/state';
import { useMobileDisableScrollSyncer } from '@jobstash/shared/state';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { PageWrapper } from '@jobstash/shared/ui';

const MetaData = dynamic(() =>
  import('@jobstash/shared/ui').then((m) => m.MetaData),
);

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

const JobsRightPanel = dynamic(() =>
  import('@jobstash/jobs/feature').then((m) => m.JobsRightPanel),
);

const JobList = dynamic(
  () => import('@jobstash/jobs/feature').then((m) => m.JobList),
  { ssr: false },
);

const NotFoundPage = dynamic(() =>
  import('@jobstash/shared/pages').then((m) => m.NotFoundPage),
);

const createCanonicalUrl = (
  job: JobPost,
  tab: string,
  routeSection: JobsRouteSection,
) => {
  const {
    shortUUID,
    organization: { orgId, projects },
  } = job;

  if (tab === 'organization') {
    return `${FRONTEND_URL}/organizations/${orgId}/details`;
  }

  if (tab === 'projects' && projects.length > 0) {
    return `${FRONTEND_URL}/projects/${projects[0].id}/details`;
  }

  return `${FRONTEND_URL}${routeSection}/${shortUUID}/details`;
};

export interface JobPostPageTemplateProps {
  initJob: JobPost;
  fromSSR: boolean;
  notFoundInfo?: NotFoundInfo;
  access?: JobPost['access'];
  jobCountAtom: PrimitiveAtom<number | null>;
  activeJobAtom: PrimitiveAtom<JobPost | null>;
  routeSection?: JobsRouteSection;
}

export const JobPostPageTemplate: React.FC<JobPostPageTemplateProps> = ({
  initJob,
  fromSSR,
  notFoundInfo,
  access,
  jobCountAtom,
  activeJobAtom,
  routeSection = ROUTE_SECTION.JOBS,
}) => {
  const [activeJob, setActiveJob] = useAtom(activeJobAtom);

  const router = useRouter();
  const shortUuid = (router.query.slug?.slice(-6) as string) ?? '';

  const { data: jobPost } = useJobPost(shortUuid);

  // (react-query breaking change v5 - removed onSuccess)
  useEffect(() => {
    if (jobPost && !initJob && fromSSR) {
      setActiveJob(jobPost);
    }
  });

  useEffect(() => {
    if (initJob) {
      setActiveJob(initJob);
    }
  }, [initJob, setActiveJob]);

  useEffect(() => {
    // Prevent scroll restore when directly accessed from address-bar
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = fromSSR ? 'manual' : 'auto';
    }
  }, [fromSSR]);

  const showFilters = useAtomValue(showFiltersAtom);

  useMobileDisableScrollSyncer({ shouldDisable: true });

  if (notFoundInfo) {
    return <NotFoundPage notFoundInfo={notFoundInfo} />;
  }

  const { slug, tab } = router.query;
  if (!slug || !tab) {
    sentryMessage(
      'JobPostPage: missing router.query definitions',
      `slug = "${slug}", tab = "${tab}"`,
    );

    throw new Error(ERR_INTERNAL);
  }

  const urlMetaData = `${FRONTEND_URL}/${routeSection}/${slug}/details`;

  const imageMetaData = `${EDGE_URL}/api/job-card?id=${jobPost?.shortUUID}`;
  const { description: descriptionMetaData, title: titleMetaData } =
    createJobCardOgDetails(jobPost);

  const currentJobPost = jobPost ?? activeJob;

  return (
    <>
      {currentJobPost && (
        <MetaData
          id={currentJobPost.shortUUID}
          title={titleMetaData}
          description={descriptionMetaData}
          url={urlMetaData}
          canonicalUrl={createCanonicalUrl(
            currentJobPost,
            tab as string,
            routeSection,
          )}
          image={imageMetaData}
          twitter={{
            site: '@jobstash_xyz',
            image: imageMetaData,
          }}
          ldJson={createJobPostLdJson(currentJobPost)}
        />
      )}

      <PageWrapper>
        <SideBar filtersRouteSection={routeSection} />

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
            <JobList
              initJob={initJob}
              access={access}
              jobCountAtom={jobCountAtom}
              activeJobAtom={activeJobAtom}
            />
          </div>
        </div>

        <div
          id={RIGHT_PANEL_WRAPPER_ID}
          className={cn(
            'hide-scrollbar fixed inset-0 h-dvh overflow-y-auto bg-dark px-4 md:px-5 pt-[58px] sm:pt-[40px] lg:pt-0 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:pr-10 lg:h-[calc(100vh-140px)] lg:mt-[140px]',
            { active: activeJob === initJob },
            { 'z-50': !showFilters },
            { '-z-50': showFilters },
          )}
        >
          <JobsRightPanel
            jobPost={currentJobPost}
            currentTab={tab.toString()}
            routeSection={routeSection}
          />
        </div>
      </PageWrapper>
    </>
  );
};
