import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';
import { type TagElement } from '@jobstash/shared/core';
import { capitalize } from '@jobstash/shared/utils';

import { CardSet } from '@jobstash/shared/ui';

import { createJobCardTags } from './utils/create-job-card-tags';

interface Props {
  jobPost: JobPost;
}

const JobDetailsTags = ({ jobPost }: Props) => {
  const tags: TagElement[] = createJobCardTags(jobPost);

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {tags.map(({ id, text, link, icon }) => (
        <CardSet key={id} link={link} icon={icon}>
          {capitalize(text)}
        </CardSet>
      ))}
    </div>
  );
};

export default memo(
  JobDetailsTags,
  (prev, next) => prev.jobPost.id === next.jobPost.id,
);
