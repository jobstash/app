import { memo } from 'react';

import { getLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  name: string;
  url: string;
  logo: string | null;
}

const RightPanelProjectCardTitle = ({ name, url, logo }: Props) => (
  <div className="flex items-center justify-between">
    <LogoTitle
      size="lg"
      title={name}
      avatarProps={{
        src: getLogoUrl(url, logo),
        alt: name,
      }}
    />
    <div className="flex gap-x-4">
      {/** TODO: Bookmark, Share IconButton here */}
    </div>
  </div>
);

export default memo(RightPanelProjectCardTitle);
