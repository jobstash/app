import { memo } from 'react';

import { JobPost } from '@jobstash/shared/core';

import { CardSet, createJobTags } from '@jobstash/shared/ui';

interface Props {
  jobPost: JobPost;
  promoteButton: React.ReactNode;
}

const JobCardTags = ({ jobPost, promoteButton }: Props) => {
  const tags = createJobTags(jobPost);

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {tags.map(({ id, text, link, icon }) => (
        <CardSet key={id} link={link} icon={icon}>
          {text}
        </CardSet>
      ))}

      {promoteButton}
    </div>
  );
};

export default memo(JobCardTags);
