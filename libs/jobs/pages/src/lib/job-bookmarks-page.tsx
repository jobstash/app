/* eslint-disable @nx/enforce-module-boundaries */
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { RIGHT_PANEL_WRAPPER_ID } from '@jobstash/right-panel/core';
import { EVENT_CARD_CLICK, JobPost } from '@jobstash/shared/core';
import { cn, dispatchEvent } from '@jobstash/shared/utils';

import { activeJobBookmarkAtom, useSavedJobs } from '@jobstash/jobs/state';
import {
  isDisabledPageScrollAtom,
  isOpenTopBannerAtom,
  useIsDesktop,
} from '@jobstash/shared/state';

import { JobBookmarkButton, JobCardNonLink } from '@jobstash/jobs/ui';
import {
  Button,
  EmptyResult,
  InternalErrorResult,
  Loader,
  PageWrapper,
} from '@jobstash/shared/ui';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

const JobBookmarksRightPanel = dynamic(() =>
  import('@jobstash/jobs/feature').then((m) => m.JobBookmarksRightPanel),
);

export const JobBookmarksPage = () => {
  const { isLoading, isError, data, isFetching } = useSavedJobs();

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

  if (isLoading) return <LoadingPage />;

  return (
    <PageWrapper>
      <SideBar />

      <div className="px-3.5 pt-[69px] lg:p-8 lg:pr-[calc(44vw)] flex flex-col gap-4">
        {data && data.length === 0 && (
          <EmptyResult
            description="You have not added any bookmarks yet."
            actionSection={
              <Button
                variant="primary"
                textProps={{ fw: 'semibold' }}
                size="md"
                onClick={onClickBrowse}
              >
                Browse Jobs
              </Button>
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
