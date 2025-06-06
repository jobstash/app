import { memo } from 'react';

import { type TagElement } from '@jobstash/shared/core';

import { CardSet } from '@jobstash/shared/ui';

interface Props {
  tags: TagElement[];
}

const RightPanelHeaderTags = ({ tags }: Props) => (
  <div className="flex flex-wrap gap-4">
    {/* <OrgReviewCardSets org={org} /> */}

    {tags.map(({ id, text, icon, link }) => (
      <CardSet key={id} link={link} icon={icon}>
        {text}
      </CardSet>
    ))}

    {/* <OrgCommunityTag isOneLine community={community} /> */}
  </div>
);

export default memo(RightPanelHeaderTags);
