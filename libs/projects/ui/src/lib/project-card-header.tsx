/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
import { memo } from 'react';

import { type ProjectInfo } from '@jobstash/shared/core';
import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  projectListItem: ProjectInfo;
}

const ProjectCardHeader = ({ projectListItem: { name, url, logo } }: Props) => (
  <div className="items-center justify-between space-y-2 lg:flex lg:space-y-0">
    <LogoTitle
      avatarProps={{ src: logo ? logo : getGoogleLogoUrl(url), alt: name }}
      title={name}
    />
  </div>
);

export default memo(ProjectCardHeader);
