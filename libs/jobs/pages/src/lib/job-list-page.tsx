import dynamic from 'next/dynamic';

const SideBar = dynamic(() =>
  import('@jobstash/sidebar/feature').then((m) => m.SideBar),
);

const JobList = dynamic(() =>
  import('@jobstash/jobs/feature').then((m) => m.JobList),
);

export const JobListPage = () => (
  <div className="w-full lg:pl-52 lg:pr-[41.67%]">
    <SideBar />

    <div className="px-3.5 pt-[65px] lg:px-8 lg:pt-0">
      <JobList initJob={null} activeJob={null} />
    </div>
  </div>
);
