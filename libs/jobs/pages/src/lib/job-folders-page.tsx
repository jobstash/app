/* eslint-disable @nx/enforce-module-boundaries */
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { RIGHT_PANEL_WRAPPER_ID } from '@jobstash/right-panel/core';
import {
  ERR_NOT_FOUND,
  EVENT_CARD_CLICK,
  JobPost,
} from '@jobstash/shared/core';
import { cn, dispatchEvent } from '@jobstash/shared/utils';

import {
  activeJobFolderBookmarkAtom,
  useJobFolder,
} from '@jobstash/jobs/state';
import {
  isDisabledPageScrollAtom,
  isOpenTopBannerAtom,
  useIsDesktop,
} from '@jobstash/shared/state';

import {
  JobBookmarkButton,
  JobBookmarkModal,
  JobBookmarkTabs,
  JobCardNonLink,
} from '@jobstash/jobs/ui';
import {
  EmptyResult,
  InternalErrorResult,
  IsMountedWrapper,
  Loader,
  PageWrapper,
} from '@jobstash/shared/ui';
import { Button as JobstashButton } from '@jobstash/shared/ui';
import { JobBookmarksRightPanel } from '@jobstash/jobs/feature';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

interface Props {
  id: string;
}

export const JobFoldersPage = ({ id }: Props) => {
  const { push } = useRouter();

  const { data: jobFolder, error, isError, isLoading } = useJobFolder(id);

  const [activeJobBookmark, setActiveJobBookmark] = useAtom(
    activeJobFolderBookmarkAtom,
  );

  const onClickBrowse = () => {
    push('/jobs', undefined, { scroll: false });
  };

  const isDesktop = useIsDesktop();
  const setIsDisabledScroll = useSetAtom(isDisabledPageScrollAtom);
  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  if (error && error.message === ERR_NOT_FOUND) return <NotFoundPage />;
  if (!jobFolder) return <LoadingPage />;

  const onClickCard = (jobPost: JobPost) => {
    setActiveJobBookmark(jobPost);

    // Right panel scroll back to top
    dispatchEvent(EVENT_CARD_CLICK);

    // Handle bookmarks (opening/closing cards for bookmark is not route-based)
    if (!isDesktop) {
      setIsDisabledScroll(true);
    }
  };

  const onClickBack = () => {
    setActiveJobBookmark(null);

    // Handle bookmarks (opening/closing cards for bookmark is not route-based)
    if (!isDesktop) {
      setIsDisabledScroll(false);
    }
  };

  return (
    <PageWrapper>
      <SideBar />

      <IsMountedWrapper>
        <JobBookmarkTabs folderName={jobFolder.name} />
      </IsMountedWrapper>

      <JobBookmarkModal />

      <div className="px-3.5 pt-[132px] lg:p-8 lg:pr-[calc(44vw)] flex flex-col gap-4">
        {jobFolder && jobFolder.jobs.length === 0 && (
          <EmptyResult
            title={`"${jobFolder.name}" folder is empty`}
            description="You have not added any bookmarks yet."
            actionSection={
              <JobstashButton
                variant="primary"
                textProps={{ fw: 'semibold' }}
                size="md"
                onClick={onClickBrowse}
              >
                Browse Jobs
              </JobstashButton>
            }
          />
        )}

        {jobFolder &&
          jobFolder.jobs.length > 0 &&
          jobFolder.jobs.map((jobPost) => (
            <JobCardNonLink
              key={jobPost.id}
              jobPost={jobPost}
              topRightAction={
                <JobBookmarkButton isFetching={false} jobPost={jobPost} />
              }
              isActive={jobPost.id === activeJobBookmark?.id}
              onClick={onClickCard}
            />
          ))}

        {isError && <InternalErrorResult />}
      </div>

      {activeJobBookmark && !isError && (
        <div
          id={RIGHT_PANEL_WRAPPER_ID}
          className={cn(
            'hide-scrollbar fixed inset-0 h-dvh overflow-y-auto bg-dark px-4 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:pr-10 lg:mt-[100px] lg:h-[calc(100vh-100px)] z-50',
            { 'lg:mt-[140px] lg:h-[calc(100vh-140px)]': isOpenTopBanner },
          )}
        >
          {isLoading && (
            <div className="flex items-center justify-center w-full h-full">
              <Loader />
            </div>
          )}

          {activeJobBookmark && (
            <JobBookmarksRightPanel
              jobPost={activeJobBookmark}
              onClickBack={onClickBack}
            />
          )}
        </div>
      )}
    </PageWrapper>
  );
};
