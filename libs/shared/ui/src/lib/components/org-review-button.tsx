import { Rating } from '@mantine/core';

import { CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useRoleClick } from '@jobstash/auth/state';

import CardSet from '../base/card-set';
import Text from '../base/text';

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
          <EmptyStar />
        )
      }
      onClick={roleClick}
    >
      {aggregateRating > 0 ? `Reviews: ${reviewCount}` : 'Leave a Review'}
    </CardSet>
  );
};

export default OrgReviewButton;

const EmptyStar = () => (
  <div className="flex items-center justify-center h-6 w-6">
    <svg
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
    >
      <path
        d="M8.93703 0L11.8669 4.99537L17.5565 6.21885L13.6777 10.5296L14.2641 16.2812L8.93703 13.95L3.60993 16.2812L4.19634 10.5296L0.317598 6.21885L6.00712 4.99537L8.93703 0Z"
        fill="#9CA3AF"
      />
    </svg>
  </div>
);
