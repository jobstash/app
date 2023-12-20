import { Rating } from '@mantine/core';

import {
  ORG_RATING_LABELS,
  type OrgRating,
} from '@jobstash/organizations/core';

import { EmptyStarIcon, Text } from '@jobstash/shared/ui';

interface Props {
  orgRating: OrgRating;
}

const OrgRatingList = ({ orgRating }: Props) => (
  <div className="flex flex-wrap gap-x-12 gap-y-4">
    {Object.entries(orgRating).map(([label, rating]) => (
      <div key={label} className="flex items-center gap-2">
        <Text fw="bold">
          {rating && rating > 0 ? rating.toFixed(1) : 'n/d'}
        </Text>
        {rating ? (
          <Rating
            count={1}
            fractions={5}
            value={(rating ?? 0) / 5}
            color="gold"
          />
        ) : (
          <EmptyStarIcon />
        )}
        <Text>
          {ORG_RATING_LABELS[label as keyof typeof ORG_RATING_LABELS]}
        </Text>
      </div>
    ))}
  </div>
);

export default OrgRatingList;
