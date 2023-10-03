import { memo } from 'react';

import { type ProjectInfo } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  projectListItem: ProjectInfo;
}

const ProjectCardHeader = ({
  projectListItem: { name, website, logo },
}: Props) => (
  <div className="items-center justify-between space-y-2 lg:flex lg:space-y-0">
    <LogoTitle
      avatarProps={{ src: getLogoUrl(website, logo), alt: name }}
      title={name}
    />
  </div>
);

export default memo(ProjectCardHeader);
