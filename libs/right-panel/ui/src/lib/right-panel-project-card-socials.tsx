import { memo } from 'react';

import { type TagElement } from '@jobstash/shared/core';

import { CardSet } from '@jobstash/shared/ui';

interface Props {
  socials: TagElement[];
}

const RightPanelProjectCardSocials = ({ socials }: Props) => {
  if (socials.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {socials.map(({ id, text, icon, link, showLinkIcon }) => (
        <CardSet key={id} link={link} icon={icon} showLinkIcon={showLinkIcon}>
          {text}
        </CardSet>
      ))}
    </div>
  );
};

export default memo(RightPanelProjectCardSocials);
