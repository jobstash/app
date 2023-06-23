import { memo } from 'react';

import { type OrgData } from '@jobstash/organizations/core';
import { type TagElement } from '@jobstash/shared/core';

import { CardSet } from '@jobstash/shared/ui';

import { createRightPanelOrgTags } from './utils/create-right-panel-org-tags';

interface Props {
  organization: OrgData;
}

const RightPanelHeaderTags = ({ organization }: Props) => {
  const tags: TagElement[] = createRightPanelOrgTags(organization);

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

export default memo(RightPanelHeaderTags);
