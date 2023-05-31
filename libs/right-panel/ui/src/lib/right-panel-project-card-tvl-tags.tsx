import { memo } from 'react';

import { type TagElement } from '@jobstash/shared/core';

import { CardSet } from '@jobstash/shared/ui';

interface Props {
  tvlTags: TagElement[];
}

const RightPanelProjectCardTvlTags = ({ tvlTags }: Props) => {
  if (tvlTags.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-wrap items-center gap-4">
        {tvlTags.map(({ id, text, icon, link, showLinkIcon }) => (
          <CardSet key={id} link={link} icon={icon} showLinkIcon={showLinkIcon}>
            {text}
          </CardSet>
        ))}
      </div>
    </>
  );
};

export default memo(RightPanelProjectCardTvlTags);
