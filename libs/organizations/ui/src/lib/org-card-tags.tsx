import { memo } from 'react';

import { type OrgPost } from '@jobstash/organizations/core';

import { CardSet } from '@jobstash/shared/ui';

import { createOrgCardTags } from './utils/create-org-card-tags';

interface Props {
  orgPost: OrgPost;
}

const OrgCardTags = ({ orgPost }: Props) => {
  const tags = createOrgCardTags(orgPost);

  if (tags.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />

      <div className="flex grow flex-wrap pt-2 lg:gap-x-2 lg:pt-0 [&>*]:mr-4">
        {tags &&
          tags.map(({ id, text, icon, link }) => (
            <CardSet key={id} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
      </div>
    </>
  );
};

export default memo(OrgCardTags);
