import { memo } from 'react';

import { type OrgListItem } from '@jobstash/organizations/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { Button, LogoTitle, OrgReviewButton } from '@jobstash/shared/ui';

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

      <Button isIcon variant="translucent" size="sm">
        <svg
          width="28"
          height="26"
          viewBox="0 0 28 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="28" height="26" rx="4" fill="white" fillOpacity="0.1" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.75 5.125V21.625C20.75 22.0392 20.4142 22.375 20 22.375C19.8594 22.375 19.7217 22.3355 19.6025 22.261L14 18.7594L8.3975 22.261C8.04625 22.4805 7.58353 22.3737 7.364 22.0225C7.2895 21.9033 7.25 21.7656 7.25 21.625V5.125C7.25 5.125 7.25 4.50368 7.68934 4.06434C7.68934 4.06434 8.12868 3.625 8.75 3.625H19.25C19.25 3.625 19.8713 3.625 20.3107 4.06434C20.3107 4.06434 20.75 4.50368 20.75 5.125ZM19.25 5.125H8.75V20.2718L13.6025 17.239C13.8457 17.087 14.1543 17.087 14.3975 17.239L19.25 20.2718V5.125Z"
            fill="#F9FAFB"
          />
        </svg>
      </Button>
    </div>
  </div>
);

export default memo(OrgCardHeader);
