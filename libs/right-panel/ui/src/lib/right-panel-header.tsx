import { memo } from 'react';

import { type OrgData } from '@jobstash/organizations/core';
import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle, Text } from '@jobstash/shared/ui';

import RightPanelHeaderSocials from './right-panel-header-socials';
import RightPanelHeaderTags from './right-panel-header-tags';

interface Props {
  organization: OrgData;
}

const RightPanelHeader = ({ organization }: Props) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-4">
      <div className="flex h-10 items-center">
        <LogoTitle
          title={organization.name}
          avatarProps={{
            src: getGoogleLogoUrl(organization.url),
            alt: organization.name,
          }}
        />
      </div>
      <RightPanelHeaderTags organization={organization} />
    </div>

    <Text color="dimmed">{organization.summary as string}</Text>

    <RightPanelHeaderSocials organization={organization} />
  </div>
);

export default memo(
  RightPanelHeader,
  // Might be different org object reference e.g. from different job post
  // but if IDs are the same, the contents would also be the same
  (prev, next) => prev.organization.id === next.organization.id,
);
