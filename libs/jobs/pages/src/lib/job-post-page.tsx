import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import { JobPost } from '@jobstash/jobs/core';
import { EDGE_URL, ERR_INTERNAL, FRONTEND_URL } from '@jobstash/shared/core';
import {
  createJobCardOgDetails,
  createJobPostLdJson,
} from '@jobstash/jobs/utils';
import { cn, sentryMessage } from '@jobstash/shared/utils';

import { showFiltersAtom } from '@jobstash/filters/state';
import { activeJobAtom, useJobPost } from '@jobstash/jobs/state';

const MetaData = dynamic(() =>
  import('@jobstash/shared/ui').then((m) => m.MetaData),
);

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

const RightPanel = dynamic(() =>
  import('@jobstash/right-panel/ui').then((m) => m.RightPanel),
);

const JobList = dynamic(
  () => import('@jobstash/jobs/feature').then((m) => m.JobList),
  { ssr: false },
);

const Filters = dynamic(() =>
  import('@jobstash/filters/feature').then((m) => m.Filters),
);

export interface JobPostPageProps {
  initJob: JobPost;
  fromSSR: boolean;
}

export const JobPostPage = ({ initJob, fromSSR }: JobPostPageProps) => {
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

  const showFilters = useAtomValue(showFiltersAtom);

  return (
    <>
      {jobPost && (
        <MetaData
          title={titleMetaData}
          description={descriptionMetaData}
          url={urlMetaData}
          image={imageMetaData}
          twitter={{
            site: '@jobstash_xyz',
            image: imageMetaData,
          }}
          ldJson={createJobPostLdJson()}
        />
      )}

      <div className={cn('w-full lg:pl-52')}>
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
            <JobList initJob={initJob} activeJob={activeJob} />
          </div>
        </div>

        <div
          className={cn(
            'lg:hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10',
            { active: activeJob === initJob },
            { 'z-50': !showFilters },
            { '-z-50': showFilters },
          )}
        >
          <RightPanel
            slug={slug.toString()}
            jobPost={jobPost}
            currentTab={tab.toString()}
          />
        </div>
      </div>
    </>
  );
};
