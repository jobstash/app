import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import { JobPost } from '@jobstash/jobs/core';
import {
  EDGE_URL,
  ERR_INTERNAL,
  FRONTEND_URL,
  type NotFoundInfo,
  ROUTE_SECTION,
} from '@jobstash/shared/core';
import {
  createJobCardOgDetails,
  createJobPostLdJson,
} from '@jobstash/jobs/utils';
import { cn, sentryMessage } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { activeJobAtom, useJobPost } from '@jobstash/jobs/state';
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

const Filters = dynamic(() =>
  import('@jobstash/filters/feature').then((m) => m.Filters),
);

const NotFoundPage = dynamic(() =>
  import('@jobstash/shared/ui').then((m) => m.NotFoundPage),
);

export interface JobPostPageProps {
  initJob: JobPost;
  fromSSR: boolean;
  notFoundInfo?: NotFoundInfo;
}

export const JobPostPage = ({
  initJob,
  fromSSR,
  notFoundInfo,
}: JobPostPageProps) => {
  const [activeJob, setActiveJob] = useAtom(activeJobAtom);

  const router = useRouter();
  const shortUuid = (router.query.slug?.slice(-6) as string) ?? '';

  const { data: jobPost } = useJobPost(shortUuid, (data) => {
    setActiveJob(data);
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

  const urlMetaData = `${FRONTEND_URL}/jobs/${slug}/details`;

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
            urlMetaData,
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
        <SideBar />

        <div
          className={cn('px-3.5 pt-[65px] lg:px-8 lg:pt-0', {
            'z-50': showFilters,
            'lg:pr-[50%]': !showFilters,
          })}
        >
          <Filters routeSection={ROUTE_SECTION.JOBS} />

          <div
            className={cn({
              'lg:pr-[50%]': showFilters,
            })}
          >
            <JobList initJob={initJob} activeJob={currentJobPost} />
          </div>
        </div>

        <div
          className={cn(
            'hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10',
            { active: activeJob === initJob },
            { 'z-50': !showFilters },
            { '-z-50': showFilters },
          )}
        >
          <JobsRightPanel
            jobPost={currentJobPost}
            currentTab={tab.toString()}
          />
        </div>
      </PageWrapper>
    </>
  );
};

const createCanonicalUrl = (job: JobPost, tab: string, defaultUrl: string) => {
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

  return `${FRONTEND_URL}/jobs/${shortUUID}/details`;
};
