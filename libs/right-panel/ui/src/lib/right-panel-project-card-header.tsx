import { memo } from 'react';

import { type TagElement } from '@jobstash/shared/core';

import RightPanelProjectCardTitle from '../right-panel-project-card-title';

import RightPanelProjectCardSocials from './right-panel-project-card-socials';

interface Props {
  id: string;
  name: string;
  url: string;
  logo: string | null;
  socials: TagElement[];
}

const RightPanelProjectCardHeader = ({
  id,
  name,
  url,
  logo,
  socials,
}: Props) => (
  <div className="flex flex-col gap-5">
    <RightPanelProjectCardTitle id={id} name={name} url={url} logo={logo} />
    <RightPanelProjectCardSocials socials={socials} />
  </div>
);

export default memo(RightPanelProjectCardHeader);
