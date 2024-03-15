import { useQuery } from '@tanstack/react-query';

import { lato } from '@jobstash/shared/core';

import { getJobList } from '@jobstash/jobs/data';

import { Card, CardSkeletons } from './card';

export const NewestJobsSection = () => {
  const { data } = useQuery({
    queryKey: ['home-page', 'job-cards'],
    queryFn: () => getJobList(1, {}, 3),
    staleTime: 1000 * 60 * 60, // 1hr
  });

  return (
    <div className="z-10 w-full items-center lg:py-0 flex flex-col gap-6">
      <h3
        className={`${lato.className} text-white font-black text-5xl md:text-6xl text-center`}
      >
        Newest Jobs
      </h3>
      <p className="text-white opacity-75 max-w-[500px] mx-auto text-md text-center">
        JobStash Curates Crypto Native Jobs Across the Entire Crypto Ecosystem,
        Powered by AI and Enhanced by Unique Data Insights—As a Public Good.
      </p>

      {data ? (
        <div className="flex gap-6">
          {data.data.map((job, i) => (
            <Card key={job.shortUUID} job={job} isFeatured={i === 1} />
          ))}
        </div>
      ) : (
        <CardSkeletons />
      )}
    </div>
  );
};
