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
    <div className="grid grid-cold-1 sm:grid-cols-2 2xl:grid-cols-3 gap-3">
      {ratings.map(([label, rating]) => (
        <div
          key={label}
          className="flex items-center gap-2 justify-start flex-wrap shrink-0"
        >
          <Text fw="bold">{rating.toFixed(1)}</Text>
          <Rating
            count={1}
            fractions={5}
            value={(rating ?? 0) / 5}
            color="gold"
          />
          <Text className="shrink-0">
            {ORG_RATING_LABELS[label as keyof typeof ORG_RATING_LABELS]}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default OrgRatingList;
