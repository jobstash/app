import { DetailsPanelCardWrapper } from '~/shared/components/details-panel/card-wrapper';
import { Heading } from '~/shared/components/heading';

import { JobDetails } from '~/jobs/core/schemas';
import { JobCardInfoTags } from '~/jobs/components/job-card/info-tags';

import { JobDetailsCardActions } from './actions';
import { JobDetailsCardDescriptions } from './descriptions';
import { JobDetailsCardSkills } from './skills';

interface Props {
  job: JobDetails;
}

export const JobDetailsCard = ({ job }: Props) => {
  return (
    <DetailsPanelCardWrapper>
      <Heading text={job.title} />
      <JobCardInfoTags job={job} />
      <JobDetailsCardActions />
      <JobDetailsCardDescriptions job={job} />
      <JobDetailsCardSkills skills={job.tags} />
    </DetailsPanelCardWrapper>
  );
};
