/* eslint-disable @nx/enforce-module-boundaries */
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { useAtom, useSetAtom } from 'jotai';

import { type JobPost } from '@jobstash/jobs/core';
import { EVENT_CARD_CLICK } from '@jobstash/shared/core';
import { cn, dispatchEvent } from '@jobstash/shared/utils';

import { activeJobBookmarkAtom, useJobBookmarks } from '@jobstash/jobs/state';
import { isDisabledPageScrollAtom, useIsMobile } from '@jobstash/shared/state';

import { JobBookmarkButton, JobBookmarkCard } from '@jobstash/jobs/ui';
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
  const { isLoading, isError, data, bookmarkedJobs, isFetching } =
    useJobBookmarks();

  const [activeJobBookmark, setActiveJobBookmark] = useAtom(
    activeJobBookmarkAtom,
  );

  const isMobile = useIsMobile();

  // Set first item as active if null (on desktop)
  useEffect(() => {
    if (!activeJobBookmark && data && data.length > 0 && !isMobile) {
      setActiveJobBookmark(data[0]);
    }
  }, [activeJobBookmark, data, isMobile, setActiveJobBookmark]);

  const onClickBack = () => {
    setActiveJobBookmark(null);

    // Handle bookmarks (opening/closing cards for bookmark is not route-based)
    setIsDisabledScroll(false);
  };

  const setIsDisabledScroll = useSetAtom(isDisabledPageScrollAtom);

  const onClickCard = (jobPost: JobPost) => {
    setActiveJobBookmark(jobPost);

    // Right panel scroll back to top
    dispatchEvent(EVENT_CARD_CLICK);

    // Handle bookmarks (opening/closing cards for bookmark is not route-based)
    setIsDisabledScroll(true);
  };

  const { push } = useRouter();
  const onClickBrowse = () => {
    push('/', undefined, { scroll: false });
  };

  if (isLoading) return <LoadingPage />;

  return (
    <PageWrapper>
      <SideBar />

      <div className="px-3.5 pt-16 lg:p-8 lg:pr-[calc(44vw)]   flex flex-col gap-4">
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
            <JobBookmarkCard
              key={jobPost.id}
              jobPost={jobPost}
              bookmarkButton={
                <JobBookmarkButton
                  shortUUID={jobPost.shortUUID}
                  isFetching={isFetching}
                  isBookmarked={bookmarkedJobs.has(jobPost.shortUUID)}
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
          className={cn(
            'hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10 lg:mt-[100px] z-50',
          )}
        >
          {isLoading && (
            <div className="flex h-full w-full items-center justify-center">
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
