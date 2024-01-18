import { memo } from 'react';

import { useAtom } from 'jotai';

import {
  showGotItCardAtom,
  useProfileReviewsPageContext,
} from '@jobstash/profile/state';

import { BreadCrumbs, Button, Text } from '@jobstash/shared/ui';

const breadCrumbs = [
  { title: 'Your Profile', href: '/profile' },
  { title: 'Organization Reviews', href: '/profile/reviews' },
];

const ProfileReviewsSubHeader = () => {
  const { profileOrgReviewCount } = useProfileReviewsPageContext();
  const [, setShowGotItCard] = useAtom(showGotItCardAtom);

  const hasOrgReview = profileOrgReviewCount && profileOrgReviewCount > 0;
  const onClickGotItCardHelper = () => {
    setShowGotItCard((prev) => ({ ...prev, reviews: !prev.reviews }));
  };

  return (
    <div className="py-2 flex justify-between items-center">
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className="flex items-center space-x-4">
        {hasOrgReview && (
          <Text color="dimmed">{`Known Organizations: ${profileOrgReviewCount}`}</Text>
        )}
        <Button isIcon onClick={onClickGotItCardHelper}>
          [ ? ]
        </Button>
      </div>
    </div>
  );
};

export default memo(ProfileReviewsSubHeader);
