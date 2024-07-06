import { lato } from '@jobstash/shared/core';

import { useHomePageJobs } from '@jobstash/home/state';

import { LoadingSection } from '../loading-section';

import { Card } from './card';

export const NewestJobsSection = () => {
  const { data } = useHomePageJobs();

  return (
    <div className="z-10 flex flex-wrap items-center w-full lg:py-0">
      <h3
        className={`${lato.className} text-white w-full text-center !leading-tight font-black text-5xl md:text-6xl text-center`}
      >
        Newest Jobs
      </h3>
      <p className="text-white opacity-75 max-w-[500px] mx-auto text-md text-center">
        JobStash Curates Crypto Native Jobs Across the Entire Crypto Ecosystem,
        Powered by AI and Enhanced by Unique Data Insights—As a Public Good.
      </p>

      {data ? (
        <div className="flex flex-wrap mt-6 space-y-6 md:space-y-0 md:-mx-3">
          {data.data.map((job) => (
            <Card key={job.shortUUID} job={job} />
          ))}
        </div>
      ) : (
        <LoadingSection className="pt-12" />
      )}
    </div>
  );
};
