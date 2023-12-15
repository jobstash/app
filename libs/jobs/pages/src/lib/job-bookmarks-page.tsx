import { LoadingPage } from '@jobstash/shared/pages';

import { useJobBookmarks } from '@jobstash/jobs/state';

import { JobCard } from '@jobstash/jobs/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const JobBookmarksPage = () => {
  const { isLoading, data } = useJobBookmarks();

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
          />
        ))}
      </div>
    </div>
  );
};
