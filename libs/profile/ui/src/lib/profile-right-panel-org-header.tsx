import { memo } from 'react';

import { type OrgInfo } from '@jobstash/shared/core';
import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle, Text } from '@jobstash/shared/ui';

import ProfileRightPanelOrgSocials from './profile-right-panel-org-socials';
import ProfileRightPanelOrgTags from './profile-right-panel-org-tags';

interface Props {
  orgInfo?: OrgInfo;
}

const ProfileRightPanelOrgHeader = ({ orgInfo }: Props) => {
  if (!orgInfo) return null;

  const { name, logo, url, summary } = orgInfo;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex h-10 items-center">
          <LogoTitle
            title={name}
            avatarProps={{
              src: logo ?? getGoogleLogoUrl(url),
              alt: name,
            }}
          />
        </div>
        <ProfileRightPanelOrgTags orgInfo={orgInfo} />
      </div>

      <Text color="dimmed">{summary as string}</Text>

      <ProfileRightPanelOrgSocials orgInfo={orgInfo} />
    </div>
  );
};

export default memo(ProfileRightPanelOrgHeader);
