import { memo } from 'react';

import { type OrgListItem } from '@jobstash/organizations/core';

import { CardSet, OrgCommunityTag } from '@jobstash/shared/ui';

import { createOrgCardTags } from './utils/create-org-card-tags';

interface Props {
  orgListItem: OrgListItem;
}

const OrgCardTags = ({ orgListItem }: Props) => {
  const tags = createOrgCardTags(orgListItem);

  if (tags.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex grow flex-wrap pt-2 gap-2 lg:pt-0 [&>*]:mr-4 pl-2">
        {tags.map(({ id, text, icon, link, showLinkIcon }) => (
          <CardSet key={id} link={link} icon={icon} showLinkIcon={showLinkIcon}>
            {text}
          </CardSet>
        ))}
        <OrgCommunityTag community={orgListItem.community} />
      </div>
    </>
  );
};

export default memo(OrgCardTags);
