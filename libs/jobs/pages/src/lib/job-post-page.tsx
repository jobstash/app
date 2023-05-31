import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { JobPost } from '@jobstash/jobs/core';
import { ERR_INTERNAL } from '@jobstash/shared/core';
import { createJobPostLdJson } from '@jobstash/jobs/utils';
import {
  cn,
  getEdgeUrl,
  getFrontendUrl,
  sentryMessage,
} from '@jobstash/shared/utils';

import { activeJobAtom, initJobAtom, useJobPost } from '@jobstash/jobs/state';

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

export interface JobPostPageProps {
  initJob: JobPost;
  fromSSR: boolean;
}

export const JobPostPage = ({ initJob, fromSSR }: JobPostPageProps) => {
  const [activeJob, setActiveJob] = useAtom(activeJobAtom);
  const [initJobAtomValue, setInitJobAtomValue] = useAtom(initJobAtom);

  const router = useRouter();
  const shortUuid = (router.query.slug?.slice(-6) as string) ?? '';

  const { data: jobPost } = useJobPost(shortUuid, (data) => {
    setActiveJob(data);
  });

  useEffect(() => {
    if (!initJobAtomValue && initJob) {
      setInitJobAtomValue(initJob);
      setActiveJob(initJob);
    }
  }, [initJob, initJobAtomValue, setActiveJob, setInitJobAtomValue]);

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

  const frontendUrl = getFrontendUrl();
  const titleMetaData = `${jobPost?.jobTitle} | ${jobPost?.organization.name}`;
  const urlMetaData = `${frontendUrl}/jobs/${slug}/details`;

  const edgeUrl = getEdgeUrl();
  const imageMetaData = `${edgeUrl}/api/job-card?id=${jobPost?.shortUUID}`;

  return (
    <>
      {jobPost && (
        <MetaData
          title={titleMetaData}
          description={
            jobPost.role ?? jobPost.benefits ?? jobPost.team ?? jobPost.jobTitle
          }
          url={urlMetaData}
          image={imageMetaData}
          twitter={{
            site: '@jobstash_xyz',
            image: imageMetaData,
          }}
          ldJson={createJobPostLdJson()}
        />
      )}

      <div className="w-full lg:pl-52 lg:pr-[41.67%]">
        <SideBar />

        <div className="px-3.5 pt-[65px] lg:px-8 lg:pt-0">
          <JobList initJob={initJob} activeJob={activeJob} />
        </div>

        <div
          className={cn(
            'lg:hide-scrollbar fixed inset-0 z-50 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10',
            { active: activeJob === initJob },
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