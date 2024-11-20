/* eslint-disable @nx/enforce-module-boundaries */
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { LoadingPage, NotFoundPage } from '@jobstash/shared/pages';
import { Button, Tooltip } from '@nextui-org/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  EarthIcon,
  LockIcon,
  Share2Icon,
  SquareArrowOutUpRight,
} from 'lucide-react';

import { PERMISSIONS } from '@jobstash/auth/core';
import { RIGHT_PANEL_WRAPPER_ID } from '@jobstash/right-panel/core';
import { EVENT_CARD_CLICK, FRONTEND_URL, JobPost } from '@jobstash/shared/core';
import {
  cn,
  dispatchEvent,
  getPluralText,
  notifSuccess,
} from '@jobstash/shared/utils';

import { useHasPermission } from '@jobstash/auth/state';
import {
  activeJobBookmarkAtom,
  JOB_BOOKMARK_TABS,
  jobBookmarkTabsAtom,
  useAllJobFolders,
  useSavedJobs,
} from '@jobstash/jobs/state';
import {
  isDisabledPageScrollAtom,
  isOpenTopBannerAtom,
  useIsDesktop,
} from '@jobstash/shared/state';

import {
  CreateJobFolderModal,
  DeleteJobFolderModal,
  EditJobFolderModal,
  JobBookmarkButton,
  JobBookmarkModal,
  JobBookmarkTabs,
  JobCardNonLink,
} from '@jobstash/jobs/ui';
import {
  Button as JobstashButton,
  EmptyResult,
  Heading,
  InternalErrorResult,
  IsMountedWrapper,
  Loader,
  PageWrapper,
} from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

const JobBookmarksRightPanel = dynamic(() =>
  import('@jobstash/jobs/feature').then((m) => m.JobBookmarksRightPanel),
);

export const SavedJobsPage = () => {
  const {
    isLoading: isLoadingSavedJobs,
    isError,
    data,
    isFetching,
  } = useSavedJobs();
  const { isLoading: isLoadingJobFolders, data: jobFolders } =
    useAllJobFolders();

  const [activeJobBookmark, setActiveJobBookmark] = useAtom(
    activeJobBookmarkAtom,
  );

  const isDesktop = useIsDesktop();

  // Set first item as active if null (on desktop)
  const initRef = useRef(false);
  useEffect(() => {
    if (
      !activeJobBookmark &&
      data &&
      data.length > 0 &&
      isDesktop &&
      !initRef.current
    ) {
      initRef.current = true;
      setActiveJobBookmark(data[0]);
    }
  }, [activeJobBookmark, data, isDesktop, setActiveJobBookmark]);

  const onClickBack = () => {
    setActiveJobBookmark(null);

    // Handle bookmarks (opening/closing cards for bookmark is not route-based)
    if (!isDesktop) {
      setIsDisabledScroll(false);
    }
  };

  const setIsDisabledScroll = useSetAtom(isDisabledPageScrollAtom);

  const onClickCard = (jobPost: JobPost) => {
    setActiveJobBookmark(jobPost);

    // Right panel scroll back to top
    dispatchEvent(EVENT_CARD_CLICK);

    // Handle bookmarks (opening/closing cards for bookmark is not route-based)
    if (!isDesktop) {
      setIsDisabledScroll(true);
    }
  };

  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  const { push } = useRouter();
  const onClickBrowse = () => {
    push('/jobs', undefined, { scroll: false });
  };

  const activeTab = useAtomValue(jobBookmarkTabsAtom);

  const hasPermission = useHasPermission(PERMISSIONS.USER);
  const isLoading = isLoadingSavedJobs || isLoadingJobFolders;

  if (isLoading) return <LoadingPage />;
  if (!hasPermission) return <NotFoundPage />;

  const isSavedJobs = activeTab === JOB_BOOKMARK_TABS.SAVED_JOBS;
  const isCustomList = activeTab === JOB_BOOKMARK_TABS.BOOKMARK_FOLDERS;

  return (
    <PageWrapper>
      <SideBar />

      <IsMountedWrapper>
        <JobBookmarkTabs />
      </IsMountedWrapper>

      <JobBookmarkModal />

      {isSavedJobs && (
        <div className="px-3.5 pt-[132px] lg:p-8 lg:pr-[calc(44vw)] flex flex-col gap-4">
          {data && data.length === 0 && (
            <EmptyResult
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

          {data &&
            data.length > 0 &&
            data?.map((jobPost) => (
              <JobCardNonLink
                key={jobPost.id}
                jobPost={jobPost}
                topRightAction={
                  <JobBookmarkButton
                    isFetching={isFetching}
                    jobPost={jobPost}
                    //
                    // shortUUID={jobPost.shortUUID}
                    // isBookmarked={bookmarkedJobs.has(jobPost.shortUUID)}
                  />
                }
                isActive={jobPost.id === activeJobBookmark?.id}
                onClick={onClickCard}
              />
            ))}

          {isError && <InternalErrorResult />}
        </div>
      )}

      {isSavedJobs && activeJobBookmark && !isError && (
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

      {isCustomList && (
        <div className="px-3.5 pt-[132px] lg:p-8 flex flex-col gap-8 [&>*]:w-full [&>*]:lg:max-w-xl">
          <div className="flex items-center gap-4 justify-between">
            <Heading size="lg">Manage Bookmark Folders</Heading>
            <CreateJobFolderModal />
          </div>

          <div className="flex flex-col gap-8">
            {(jobFolders?.data ?? []).map((jobFolder) => {
              const { id, name, jobs, isPublic, slug } = jobFolder;
              const itemCount = jobs.length;

              const countText =
                itemCount === 0
                  ? 'No jobs on this list'
                  : `${itemCount} ${getPluralText('job post', itemCount)}`;

              const href = `/bookmarks/jobs/${slug}`;

              const onShare = () => {
                if (navigator) {
                  const link = `${FRONTEND_URL}${href}`;
                  navigator.clipboard.writeText(link);
                  notifSuccess({
                    title: `Link copied to clipboard!`,
                    message: `You can now share "${name}" folder with others`,
                  });
                }
              };

              return (
                <div
                  key={id}
                  className="rounded-lg p-4 bg-content2 flex justify-between items-center gap-4"
                >
                  <div className="flex flex-col gap-0">
                    <div className="flex items-center gap-1">
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href={href}
                        className="text-xl font-bold text-white hover:underline max-w-[20ch] truncate"
                      >
                        {name}
                      </Link>
                      <Tooltip content="Open list in new tab">
                        <Button
                          isIconOnly
                          size="sm"
                          className="text-white/90"
                          as={Link}
                          target="_blank"
                          rel="noreferrer"
                          href={href}
                        >
                          <SquareArrowOutUpRight className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Tooltip content={isPublic ? 'Public' : 'Private'}>
                        {isPublic ? (
                          <EarthIcon className="w-4 h-4" />
                        ) : (
                          <LockIcon className="w-4 h-4" />
                        )}
                      </Tooltip>
                      <div className="pt-0.5">
                        <Link
                          target="_blank"
                          rel="noreferrer"
                          href={href}
                          className="text-sm hover:underline text-white/80"
                        >
                          {countText}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DeleteJobFolderModal jobFolder={jobFolder} />
                    <EditJobFolderModal jobFolder={jobFolder} />
                    <Tooltip
                      content={isPublic ? 'Share Link' : 'List is Private'}
                    >
                      <div>
                        <Button
                          isIconOnly
                          size="sm"
                          className="text-white/90"
                          variant="faded"
                          isDisabled={!isPublic}
                          onClick={onShare}
                        >
                          <Share2Icon className="w-5 h-5" />
                        </Button>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PageWrapper>
  );
};
