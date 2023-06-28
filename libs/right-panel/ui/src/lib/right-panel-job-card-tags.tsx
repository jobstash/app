import { memo } from 'react';

import { type JobInfo, type TagElement } from '@jobstash/shared/core';
import { capitalize } from '@jobstash/shared/utils';

import { CardSet, createJobTags } from '@jobstash/shared/ui';

interface Props {
  jobInfo: JobInfo;
}

const RightPanelJobCardTags = ({ jobInfo }: Props) => {
  const tags: TagElement[] = createJobTags(jobInfo);

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

export default memo(RightPanelJobCardTags);
