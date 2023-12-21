import { memo } from 'react';

import { type OrgListItem } from '@jobstash/organizations/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { LogoTitle, OrgReviewCardSets } from '@jobstash/shared/ui';

interface Props {
  orgListItem: OrgListItem;
}

const OrgCardHeader = ({ orgListItem }: Props) => {
  const { name, location, url, logoUrl } = orgListItem;

  return (
    <div className="items-center justify-between space-y-2 lg:flex lg:space-y-0">
      <LogoTitle
        avatarProps={{ src: getLogoUrl(url, logoUrl), alt: name }}
        title={name}
        location={location}
      />

      <div className="flex items-center gap-4">
        <OrgReviewCardSets org={orgListItem} />

        {/* <BookmarkButton isBookmarked={false} /> */}
      </div>
    </div>
  );
};

export default memo(OrgCardHeader);
