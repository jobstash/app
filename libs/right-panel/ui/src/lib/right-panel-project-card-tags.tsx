import { memo } from 'react';

import { type TagElement } from '@jobstash/shared/core';

import { CardSet } from '@jobstash/shared/ui';

interface Props {
  tags: TagElement[];
}

const RightPanelProjectCardTags = ({ tags }: Props) => {
  if (tags.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-wrap items-center gap-4">
        {tags.map(({ id, text, icon, link, showLinkIcon }) => (
          <CardSet key={id} link={link} icon={icon} showLinkIcon={showLinkIcon}>
            {text}
          </CardSet>
        ))}
      </div>
    </>
  );
};

export default memo(RightPanelProjectCardTags);
