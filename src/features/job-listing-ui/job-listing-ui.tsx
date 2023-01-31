import type { JobListing } from '~/core/interfaces';
import type { VoidFn } from '~/core/types';

import { SkillMapper } from '../unstyled-ui/skill-mapper';

import { JobListingHeader } from './job-listing-header';
import { JobListingOrgInfo } from './job-listing-org-info';
import { JobListingProject } from './job-listing-project';
import { JobListingWrapper } from './job-listing-wrapper';

interface Props {
  jobListing: JobListing;
  isActive: boolean;
  onClick: VoidFn;
}

export const JobListingUi = ({ jobListing, isActive, onClick }: Props) => {
  const { job, org, project } = jobListing;
  const skills = [
    ...job.skills.main,
    ...job.skills.hasMentor,
    ...job.skills.shared,
  ];

  return (
    <JobListingWrapper isActive={isActive} onClick={onClick}>
      <JobListingHeader job={job} />

      <SkillMapper skills={skills} isParentActive={isActive} />
      <hr className="h-px border-0 bg-white/30" />

      <JobListingOrgInfo org={org} />

      <div>{project && <JobListingProject project={project} />}</div>
    </JobListingWrapper>
  );
};
