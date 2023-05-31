import { memo } from 'react';

import { type JobPost } from '@jobstash/jobs/core';
import { type TagElement } from '@jobstash/shared/core';
import { capitalize } from '@jobstash/shared/utils';

import { createJobCardTags } from '@jobstash/jobs/ui';
import { CardSet } from '@jobstash/shared/ui';

interface Props {
  jobPost: JobPost;
}

const RightPanelJobCardTags = ({ jobPost }: Props) => {
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
  RightPanelJobCardTags,
  (prev, next) => prev.jobPost.id === next.jobPost.id,
);
