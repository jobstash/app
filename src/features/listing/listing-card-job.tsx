import type { Listing, ListingProps } from '~/core/interfaces';
import { createJobTags } from '~/utils/create-job-tags';

import { Divider } from '../unstyled-ui/base/divider';

import { ListingHeader } from './listing-header';
import { ListingOrg } from './listing-org';
import { ListingProject } from './listing-projects';
import { ListingTags } from './listing-tags';
import { ListingTechs } from './listing-techs';
import { ListingWrapper } from './listing-wrapper';

/** Override listing field as JobListing */
interface Props extends ListingProps {
  listing: Listing;
}

/** UI for job-listing card */
export const ListingCardJob = ({ listing, isActive, onClick }: Props) => {
  const { jobs, org, projects } = listing;

  // This state should be very unlikely
  // We put this guard due to how the interface was defined
  if (!jobs || jobs.length === 0) return null;

  // Note: bff should make sure jobs array should contain 1 element
  //			 or at least make the first-element as the current job to be displayed
  const job = jobs[0];

  // Tech skills array for the job
  const skills = [
    ...job.skills.main,
    ...job.skills.hasMentor,
    ...job.skills.shared,
  ];

  return (
    <ListingWrapper isActive={isActive} onClick={onClick}>
      <ListingHeader title={job.title} recent={job.created} />
      <ListingTags tags={createJobTags(job)} />
      <Divider />
      <ListingTechs techs={skills} />
      <Divider />
      <ListingOrg org={org} />
      {projects.length > 0 && <ListingProject projects={projects} />}
    </ListingWrapper>
  );
};
