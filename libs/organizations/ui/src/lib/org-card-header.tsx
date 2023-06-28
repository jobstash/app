import { memo } from 'react';

import { type OrgListItem } from '@jobstash/organizations/core';
import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  orgListItem: OrgListItem;
}

const OrgCardHeader = ({ orgListItem: { name, location, url } }: Props) => (
  <div className="items-center justify-between space-y-2 lg:flex lg:space-y-0">
    <LogoTitle
      avatarProps={{ src: getGoogleLogoUrl(url), alt: name }}
      title={name}
      location={location}
    />
  </div>
);

export default memo(OrgCardHeader);
