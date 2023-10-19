import { memo } from 'react';

import { useProfileReviewsPageContext } from '@jobstash/profile/state';

import { BreadCrumbs, Button, RefreshIcon, Text } from '@jobstash/shared/ui';

const breadCrumbs = [
  { title: 'Your Profile', href: '/profile' },
  { title: 'Organization Reviews', href: '/profile/reviews' },
];

const ProfileReviewsSubHeader = () => {
  const { profileOrgReviewCount } = useProfileReviewsPageContext();

  const hasOrgReview = profileOrgReviewCount && profileOrgReviewCount > 0;

  return (
    <div className="px-4 flex justify-between items-center">
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className="flex items-center space-x-4">
        {hasOrgReview && (
          <Text color="dimmed">{`Known Organizations: ${profileOrgReviewCount}`}</Text>
        )}
        <Button isIcon isDisabled>
          <RefreshIcon />
        </Button>
        <Button isIcon isDisabled>
          [ ? ]
        </Button>
      </div>
    </div>
  );
};

export default memo(ProfileReviewsSubHeader);
