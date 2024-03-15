import { useHomePageJobs, useHomePageOrgs } from '@jobstash/home/state';

import { ExploreJobsButton } from '../buttons/explore-jobs-button';
import { LoadingSection } from '../loading-section';

interface Props {
  isLoadingSibling: boolean;
}

export const BrowseSection = ({ isLoadingSibling }: Props) => {
  const { data: jobData } = useHomePageJobs();
  const { data: orgData } = useHomePageOrgs();

  if (!jobData && !isLoadingSibling) return <LoadingSection />;
  if (!orgData && !isLoadingSibling) return <LoadingSection />;

  const jobCount = jobData?.total;
  const orgCount = orgData?.total;

  return (
    <div className="flex flex-col gap-2">
      <div className="max-w-[490px] mx-auto px-8">
        <p className="text-white opacity-75 text-md text-center">
          Browse {jobCount} crypto jobs at {orgCount} organizations. Filter the
          best remote crypto jobs by salary, location, and skills.
        </p>
      </div>

      <div className="w-[150px] mx-auto text-center flex justify-center flex-col items-center">
        <span className="inline-block opacity-75 pb-3 text-white text-md text-center">
          or
        </span>

        <ExploreJobsButton text="Explore Crypto Jobs" />
      </div>
    </div>
  );
};
