import { Rating } from '@mantine/core';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useRoleClick } from '@jobstash/auth/state';

import CardSet from '../base/card-set';
import Text from '../base/text';
import EmptyStarIcon from '../icons/empty-star-icon';

interface Props {
  aggregateRating: number;
  reviewCount: number;
}

const OrgReviewButton = ({ aggregateRating, reviewCount }: Props) => {
  const { roleClick } = useRoleClick(CHECK_WALLET_ROLES.DEV, () => {
    console.log('TODO: Open Reviews Tab');
  });

  return (
    <CardSet
      icon={
        aggregateRating > 0 ? (
          <div className="flex items-center gap-2">
            <Text size="sm" fw="bold">
              {aggregateRating}
            </Text>
            <Rating value={aggregateRating} count={1} fw="bold" color="gold" />
          </div>
        ) : (
          <EmptyStarIcon />
        )
      }
      onClick={roleClick}
    >
      {aggregateRating > 0 ? `Reviews: ${reviewCount}` : 'Leave a Review'}
    </CardSet>
  );
};

export default OrgReviewButton;
