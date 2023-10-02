import { useRef } from 'react';

const FeaturedJobs = () => (
  <div className="flex flex-col gap-4">
    <div className="flex w-full justify-between">
      <p>Featured Jobs</p>
      <p>View All</p>
    </div>
    <div className="flex gap-8 justify-around px-4">
      <div className="w-full h-60 border border-red-500 flex justify-center items-center">
        <p>Job 1</p>
      </div>
      <div className="w-full border border-red-500 flex justify-center items-center">
        <p>Job 2</p>
      </div>
    </div>
  </div>
);

export default FeaturedJobs;
