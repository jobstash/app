import { LoadingPage } from '@jobstash/shared/pages';

import { useJobBookmarks } from '@jobstash/jobs/state';

import { JobBookmarkButton, JobCard } from '@jobstash/jobs/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const JobBookmarksPage = () => {
  const { isLoading, data, bookmarkedJobs } = useJobBookmarks();

  if (isLoading) return <LoadingPage />;

  return (
    <div className="w-full lg:pl-52">
      <SideBar />

      <div className="px-3.5 pt-16 lg:p-8 lg:pr-[50%]">
        {data?.map((jobPost) => (
          <JobCard
            key={jobPost.id}
            jobPost={jobPost}
            isActive={false}
            filterParamsObj={{}}
            bookmarkButton={
              <JobBookmarkButton
                shortUUID={jobPost.shortUUID}
                isBookmarked={bookmarkedJobs.has(jobPost.shortUUID)}
                isFetching={isLoading}
              />
            }
          />
        ))}
      </div>
    </div>
  );
};
