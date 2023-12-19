import { memo } from 'react';

import { type RightPanelOrg } from '@jobstash/right-panel/core';
import { type TagElement } from '@jobstash/shared/core';

import { CardSet, OrgReviewCardSets } from '@jobstash/shared/ui';

import { createRightPanelOrgTags } from './utils/create-right-panel-org-tags';

interface Props {
  org: RightPanelOrg;
}

const RightPanelHeaderTags = ({ org }: Props) => {
  const tags: TagElement[] = createRightPanelOrgTags(org);

  return (
    <div className="flex gap-4 flex-wrap">
      <OrgReviewCardSets org={org} />

      {tags.map(({ id, text, icon, link }) => (
        <CardSet key={id} link={link} icon={icon}>
          {text}
        </CardSet>
      ))}
    </div>
  );
};

export default memo(RightPanelHeaderTags);
