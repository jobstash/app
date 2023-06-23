import { memo } from 'react';

import { type OrgPost } from '@jobstash/organizations/core';
import { getGoogleLogoUrl, prettyTimestamp } from '@jobstash/shared/utils';

import { LogoTitle } from '@jobstash/shared/ui';

interface Props {
  orgPost: OrgPost;
}

const OrgCardHeader = ({
  orgPost: { createdTimestamp, name, location, url },
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const timestamp = prettyTimestamp(createdTimestamp!);

  return (
    <div className="items-center justify-between space-y-2 lg:flex lg:space-y-0">
      <LogoTitle
        avatarProps={{ src: getGoogleLogoUrl(url), alt: name }}
        title={name}
        location={location}
      />
      <hr className="flex border-t border-white/10 lg:hidden" />
      <div className="hidden items-center space-x-3 lg:flex">
        <span className="text-sm">{timestamp}</span>
      </div>
    </div>
  );
};

export default memo(OrgCardHeader);
