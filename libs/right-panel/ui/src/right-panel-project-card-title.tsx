import { memo } from 'react';

import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  name: string;
  url: string;
  logo?: string;
}

const RightPanelProjectCardTitle = ({ name, url, logo }: Props) => (
  <div className="flex items-center justify-between">
    <LogoTitle
      size="lg"
      title={name}
      avatarProps={{
        src: logo && logo.trim().length > 0 ? logo : getGoogleLogoUrl(url),
        alt: name,
      }}
    />
    <div className="flex gap-x-4">
      {/** TODO: Bookmark, Share IconButton here */}
    </div>
  </div>
);

export default memo(RightPanelProjectCardTitle);
