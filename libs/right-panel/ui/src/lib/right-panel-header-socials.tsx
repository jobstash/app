import { memo } from 'react';

import { Socials, type TagElement } from '@jobstash/shared/core';

import { CardSet } from '@jobstash/shared/ui';

import { createRightPanelSocialTags } from './utils/create-right-panel-social-tags';

interface Props {
  socials: Socials;
}

const RightPanelHeaderSocials = ({ socials }: Props) => {
  const tags: TagElement[] = createRightPanelSocialTags(socials);

  return (
    <div className="flex flex-wrap items-center gap-4">
      {tags.map(({ id, text, icon, link }) => (
        <CardSet key={id} link={link} icon={icon}>
          {text}
        </CardSet>
      ))}
    </div>
  );
};

export default memo(RightPanelHeaderSocials);
