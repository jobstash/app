import { memo } from 'react';

import { type TagElement } from '@jobstash/shared/core';
import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import RightPanelProjectCardTitle from '../right-panel-project-card-title';

import RightPanelProjectCardSocials from './right-panel-project-card-socials';

interface Props {
  name: string;
  url: string;
  logo?: string;
  socials: TagElement[];
}

const RightPanelProjectCardHeader = ({ name, url, logo, socials }: Props) => (
  <div className="flex flex-col gap-5">
    <RightPanelProjectCardTitle
      name={name}
      url={url}
      logo={logo && logo.length > 1 ? logo : getGoogleLogoUrl(url)}
    />
    <RightPanelProjectCardSocials socials={socials} />
  </div>
);

export default memo(RightPanelProjectCardHeader);
