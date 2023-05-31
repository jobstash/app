import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';

import { CardSet } from '@jobstash/shared/ui';

import { createJobCardTags } from './utils/create-job-card-tags';

interface Props {
  jobPost: JobPost;
}

const JobCardTags = ({ jobPost }: Props) => {
  const tags = createJobCardTags(jobPost);

  return (
    <div className="flex flex-wrap [&>*]:mr-4">
      {tags.map(({ id, text, link, icon }) => (
        <CardSet key={id} link={link} icon={icon}>
          {text}
        </CardSet>
      ))}
    </div>
  );
};

export default memo(JobCardTags);
