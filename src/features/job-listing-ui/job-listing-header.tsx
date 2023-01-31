import type { Job } from '~/core/interfaces';

import { Text } from '../unstyled-ui/base/text';
import { BookmarkButton } from '../unstyled-ui/bookmark-button';
import { JobTagMapper } from '../unstyled-ui/job-tag-mapper';

interface Props {
  job: Job;
}

export const JobListingHeader = ({ job }: Props) => {
  const { title, created } = job;

  return (
    <>
      <div className="flex justify-between">
        <Text htmlTag="h1" size="xl" fw="semibold" className="text-white/90">
          {title}
        </Text>

        <div className="flex items-center space-x-4">
          <Text htmlTag="h3" size="md" fw="regular" className="text-white/80">
            {created}
          </Text>
          <BookmarkButton />
        </div>
      </div>

      <JobTagMapper job={job} />

      <hr className="h-px border-0 bg-white/30" />
    </>
  );
};
