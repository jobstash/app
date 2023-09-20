import { memo } from 'react';

import { type RightPanelOrg } from '@jobstash/right-panel/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle, Text } from '@jobstash/shared/ui';

import RightPanelHeaderSocials from './right-panel-header-socials';
import RightPanelHeaderTags from './right-panel-header-tags';

interface Props {
  org: RightPanelOrg;
}

const RightPanelHeader = ({ org }: Props) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-4">
      <div className="flex h-10 items-center">
        <LogoTitle
          title={org.name}
          avatarProps={{
            src: getLogoUrl(org.url, org.logo),
            alt: org.name,
          }}
        />
      </div>
      <RightPanelHeaderTags org={org} />
    </div>

    <Text color="dimmed">{org.summary as string}</Text>

    <RightPanelHeaderSocials org={org} />
  </div>
);

export default memo(
  RightPanelHeader,
  // Might be different org object reference e.g. from different job post
  // but if IDs are the same, the contents would also be the same
  (prev, next) => prev.org.id === next.org.id,
);
