import { memo } from 'react';

import { type TagElement } from '@jobstash/shared/core';

import { CardSet } from '@jobstash/shared/ui';

interface Props {
  auditTags: TagElement[];
}

const RightPanelProjectCardAuditTags = ({ auditTags }: Props) => {
  if (auditTags.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex flex-wrap items-center gap-4">
        {auditTags.map(({ id, text, icon, link, showLinkIcon }) => (
          <CardSet key={id} link={link} icon={icon} showLinkIcon={showLinkIcon}>
            {text}
          </CardSet>
        ))}
      </div>
    </>
  );
};

export default memo(RightPanelProjectCardAuditTags);
