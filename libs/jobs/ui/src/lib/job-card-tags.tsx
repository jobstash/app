import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';

import { CardSet, createJobTags } from '@jobstash/shared/ui';

interface Props {
  jobPost: JobPost;
}

const JobCardTags = ({ jobPost }: Props) => {
  const tags = createJobTags(jobPost);

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
