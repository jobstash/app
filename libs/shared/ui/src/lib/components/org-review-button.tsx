import { Rating } from '@mantine/core';

import CardSet from '../base/card-set';
import Text from '../base/text';

interface Props {
  aggregateRating: number;
  reviewCount: number;
}

const OrgReviewButton = ({ aggregateRating, reviewCount }: Props) => (
  <CardSet
    icon={
      <div className="flex items-center gap-2">
        <Text size="sm" fw="bold">
          {aggregateRating}
        </Text>
        <Rating value={3.4} count={1} fw="bold" color="gold" />
      </div>
    }
    onClick={() => console.log('TODO: Open Reviews Tab')}
  >
    {`Reviews: ${reviewCount}`}
  </CardSet>
);

export default OrgReviewButton;
