import { useJobBookmarks } from '@jobstash/jobs/state';

import { SideBar } from '@jobstash/sidebar/feature';

export const JobBookmarksPage = () => {
  const { isLoading, data } = useJobBookmarks();

  return (
    <div className="w-full lg:pl-52">
      <SideBar />

      <div className="px-3.5 pt-16 lg:px-8 lg:pt-0">
        <pre>{JSON.stringify({ isLoading, data }, undefined, '\t')}</pre>
      </div>
    </div>
  );
};
