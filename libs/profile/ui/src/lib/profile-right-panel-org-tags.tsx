import { memo } from 'react';

import { type OrgInfo, type TagElement } from '@jobstash/shared/core';

import { CardSet } from '@jobstash/shared/ui';

import { createRightPanelOrgTags } from './utils/create-right-panel-org-tags';

interface Props {
  orgInfo: OrgInfo;
}

const ProfileRightPanelOrgTags = ({ orgInfo }: Props) => {
  const tags: TagElement[] = createRightPanelOrgTags(orgInfo);

  return (
    <div className="flex gap-4 flex-wrap">
      {tags.map(({ id, text, icon, link }) => (
        <CardSet key={id} link={link} icon={icon}>
          {text}
        </CardSet>
      ))}
    </div>
  );
};

export default memo(ProfileRightPanelOrgTags);
