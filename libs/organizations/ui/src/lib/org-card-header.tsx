import { memo } from 'react';

import { type OrgListItem } from '@jobstash/organizations/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import {
  BookmarkButton,
  LogoTitle,
  OrgReviewButton,
} from '@jobstash/shared/ui';

interface Props {
  orgListItem: OrgListItem;
}

const OrgCardHeader = ({
  orgListItem: { name, location, url, logoUrl, aggregateRating, reviewCount },
}: Props) => (
  <div className="items-center justify-between space-y-2 lg:flex lg:space-y-0">
    <LogoTitle
      avatarProps={{ src: getLogoUrl(url, logoUrl), alt: name }}
      title={name}
      location={location}
    />

    <div className="flex items-center gap-4">
      <OrgReviewButton
        aggregateRating={aggregateRating}
        reviewCount={reviewCount}
      />

      <BookmarkButton />
    </div>
  </div>
);

export default memo(OrgCardHeader);
