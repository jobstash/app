import { memo } from 'react';

import type { JobListResult } from '../../../jobs/core/types';

import JobCardHeader from './job-card-header';
import JobCardOrg from './job-card-org';
import JobCardProjects from './job-card-projects';
import JobCardTags from './job-card-tags';
import JobCardTechs from './job-card-techs';
import JobCardWrapper from './job-card-wrapper';

interface Props {
  jobListResult: JobListResult;
  isActive: boolean;
  shouldScroll?: boolean;
  filterParamsObj: Record<string, string>;
}

const JobCard = ({
  jobListResult,
  isActive,
  shouldScroll,
  filterParamsObj,
}: Props) => {
  const { organization, technologies } = jobListResult;
  const { jobTitle, jobCreatedTimestamp } = jobListResult;
  const { projects, fundingRounds } = organization;

  return (
    <JobCardWrapper
      jobListResult={jobListResult}
      isActive={isActive}
      shouldScroll={shouldScroll}
      filterParamsObj={filterParamsObj}
    >
      <JobCardHeader title={jobTitle} ts={jobCreatedTimestamp} />
      <JobCardTags jobPost={jobListResult} />
      <JobCardTechs techs={technologies} />
      <JobCardOrg org={organization} fundingRounds={fundingRounds} />
      <JobCardProjects projects={projects} />
    </JobCardWrapper>
  );
};

export default memo(JobCard);
