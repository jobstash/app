import type { Job } from '~/core/interfaces';

import { getJobTags } from '../job-listing-ui/utils';

import { TagButton } from './tag-button';

interface Props {
  job: Job;
}

export const JobTagMapper = ({ job }: Props) => (
  <div className="flex items-center space-x-2">
    {getJobTags(job).map(({ text, icon }) => (
      <TagButton key={text} text={text} icon={icon} />
    ))}
  </div>
);
