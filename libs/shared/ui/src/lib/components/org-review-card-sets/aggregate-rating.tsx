import { Rating } from '@mantine/core';

import CardSet from '../../base/card-set';
import Text from '../../base/text';

interface Props {
  aggregateRating: number;
  onClick: () => void;
}

const AggregateRating = ({ aggregateRating, onClick }: Props) => (
  <CardSet
    icon={
      <div className="flex items-center gap-1">
        <Text size="sm" fw="bold">
          {aggregateRating.toFixed(1)}
        </Text>
        <Rating
          value={aggregateRating / 5}
          fractions={5}
          count={1}
          fw="bold"
          color="gold"
        />
      </div>
    }
    onClick={onClick}
  >
    {null}
  </CardSet>
);

export default AggregateRating;
