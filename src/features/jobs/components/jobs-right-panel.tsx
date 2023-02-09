import type { Post } from '~/core/interfaces';

import { JobRightPanel } from './job-right-panel';

interface Props {
  jobs: Post['jobs'];
}

export const JobsRightPanel = ({ jobs }: Props) => {
  if (!jobs || jobs.length === 0) return null;

  return (
    <div>
      {jobs.map((job) => (
        <JobRightPanel key={job.id} job={job} />
      ))}
    </div>
  );
};
