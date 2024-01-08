import { Rating } from '@mantine/core';

import {
  ORG_RATING_LABELS,
  type OrgRating,
} from '@jobstash/organizations/core';

import { Text } from '@jobstash/shared/ui';

interface Props {
  orgRating: OrgRating;
}

const OrgRatingList = ({ orgRating }: Props) => {
  const ratings = Object.entries(orgRating).filter(
    ([, rating]) => rating !== null,
  ) as [string, number][];

  return (
    <div className="flex flex-wrap gap-x-12 gap-y-4">
      {ratings.map(([label, rating]) => (
        <div key={label} className="flex items-center gap-2">
          <Text fw="bold">{rating.toFixed(1)}</Text>
          <Rating
            count={1}
            fractions={5}
            value={(rating ?? 0) / 5}
            color="gold"
          />
          <Text>
            {ORG_RATING_LABELS[label as keyof typeof ORG_RATING_LABELS]}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default OrgRatingList;
