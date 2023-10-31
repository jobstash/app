import { memo } from 'react';

import { type JobCardSet, type TagElement } from '@jobstash/shared/core';
import { capitalize } from '@jobstash/shared/utils';

import { CardSet, createJobTags } from '@jobstash/shared/ui';

interface Props {
  jobCardSet: JobCardSet;
}

const RightPanelJobCardSets = ({ jobCardSet }: Props) => {
  const tags: TagElement[] = createJobTags(jobCardSet);

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

export default memo(RightPanelJobCardSets);
