import { memo } from 'react';

import { useProfileReviewsPageContext } from '@jobstash/profile/state';

import { BreadCrumbs, Button, RefreshIcon, Text } from '@jobstash/shared/ui';

const breadCrumbs = [
  { title: 'Your Profile' },
  { title: 'Organization Reviews', href: '/profile/reviews' },
];

const ProfileReviewsSubHeader = () => {
  const { profileOrgReviewCount } = useProfileReviewsPageContext();

  return (
    <div className="px-4 flex justify-between items-center">
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className="flex items-center space-x-4">
        <Text color="dimmed">{`Known Organizations: ${profileOrgReviewCount}`}</Text>
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
