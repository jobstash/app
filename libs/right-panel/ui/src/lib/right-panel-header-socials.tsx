import { memo } from 'react';

import { type Organization } from '@jobstash/organizations/core';
import { type TagElement } from '@jobstash/shared/core';

import { CardSet } from '@jobstash/shared/ui';

import { createRightPanelSocialTags } from './utils/create-right-panel-social-tags';

interface Props {
  organization: Organization;
}

const RightPanelHeaderSocials = ({ organization }: Props) => {
  const socials: TagElement[] = createRightPanelSocialTags(organization);

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
