import { memo } from 'react';

import { type ProfileOrgReview } from '@jobstash/profile/core';
import { type TagElement } from '@jobstash/shared/core';

import { CardSet } from '@jobstash/shared/ui';

import { createOrgInfoSocials } from './utils/create-right-panel-org-socials';

interface Props {
  orgInfo: ProfileOrgReview['org'];
}

const ProfileRightPanelOrgSocials = ({ orgInfo }: Props) => {
  const socials: TagElement[] = createOrgInfoSocials(orgInfo);

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

export default memo(ProfileRightPanelOrgSocials);
