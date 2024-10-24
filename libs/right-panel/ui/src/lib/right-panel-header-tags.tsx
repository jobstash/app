import { memo } from 'react';

import { type RightPanelOrg } from '@jobstash/right-panel/core';
import { type TagElement } from '@jobstash/shared/core';

import { CardSet, OrgCommunityTag } from '@jobstash/shared/ui';

import { createRightPanelOrgTags } from './utils/create-right-panel-org-tags';

interface Props {
  org: RightPanelOrg;
}

const RightPanelHeaderTags = ({ org }: Props) => {
  const tags: TagElement[] = createRightPanelOrgTags(org);

  return (
    <div className="flex flex-wrap gap-4">
      {/* <OrgReviewCardSets org={org} /> */}

      {tags.map(({ id, text, icon, link }) => (
        <CardSet key={id} link={link} icon={icon}>
          {text}
        </CardSet>
      ))}

      <OrgCommunityTag isOneLine community={org.community} />
    </div>
  );
};

export default memo(RightPanelHeaderTags);
