import { Job } from '~/features/jobs/core/interfaces';

import { JobRightPanel } from './job-right-panel';

interface Props {
  listings: Job[] | null;
}

export const JobsRightPanel = ({ listings }: Props) => {
  if (!listings || listings.length === 0) return null;

  return (
    <div className="">
      {listings.map((listing) => (
        <JobRightPanel key={listing.jobpost.id} />
      ))}
    </div>
  );
};
