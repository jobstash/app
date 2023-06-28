import { memo } from 'react';

import { type RightPanelOrg } from '@jobstash/right-panel/core';
import { type TagElement } from '@jobstash/shared/core';

import { CardSet } from '@jobstash/shared/ui';

import { createRightPanelSocialTags } from './utils/create-right-panel-social-tags';

interface Props {
  org: RightPanelOrg;
}

const RightPanelHeaderSocials = ({ org }: Props) => {
  const socials: TagElement[] = createRightPanelSocialTags(org);

  return (
    <div className="flex gap-4 flex-wrap">
      {socials.map(({ id, text, icon, link }) => (
        <CardSet key={id} link={link} icon={icon}>
          {text}
        </CardSet>
      ))}
    </div>
  );
};

export default memo(RightPanelHeaderSocials);
