import { memo } from 'react';

import type { Job } from '../../../jobs/core/types';

import JobCardHeader from './job-card-header';
import JobCardOrg from './job-card-org';
import JobCardProject from './job-card-project';
import JobCardTags from './job-card-tags';
import JobCardTechs from './job-card-techs';
import JobCardWrapper from './job-card-wrapper';

interface Props {
  job: Job;
  isActive: boolean;
  shouldScroll?: boolean;
}

const JobCard = ({ job, isActive, shouldScroll }: Props) => {
  const { jobpost, organization, project, technologies } = job;
  const { jobTitle, jobCreatedTimestamp } = jobpost;

  return (
    <JobCardWrapper job={job} isActive={isActive} shouldScroll={shouldScroll}>
      <JobCardHeader title={jobTitle} ts={jobCreatedTimestamp} />
      <JobCardTags jobPost={jobpost} />
      <JobCardTechs techs={technologies} />
      <JobCardOrg org={organization} />
      {project && <JobCardProject project={project} />}
    </JobCardWrapper>
  );
};

export default memo(JobCard);
