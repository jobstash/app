import { Rating, RoundedStar } from '@smastrom/react-rating';

import { Text } from '~/shared/components/text';

import { ORG_RATING_LABELS } from '~/orgs/core/constants';
import { OrgRating } from '~/orgs/core/schemas';

interface Props {
  rating: OrgRating;
}

export const RatingList = ({ rating: ratings }: Props) => {
  const filteredRatings = Object.entries(ratings).filter(
    ([, rating]) => rating !== null,
  ) as [string, number][];

  return (
    <div className="2xl:grid-cols-3 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-4">
      {filteredRatings.map(([label, rating]) => (
        <div
          key={label}
          className="flex shrink-0 flex-col flex-wrap items-start justify-start gap-2 md:flex-row md:items-center"
        >
          <div className="flex items-center gap-2">
            <Text
              className="text-base font-bold text-white"
              text={rating.toFixed(1)}
            />
            <Rating
              readOnly
              value={rating}
              style={{ maxWidth: 120 }}
              itemStyles={RATING_ITEM_STYLES}
            />
          </div>

          <Text
            className="shrink-0 text-base text-white"
            text={ORG_RATING_LABELS[label as keyof typeof ORG_RATING_LABELS]}
          />
        </div>
      ))}
    </div>
  );
};

const RATING_ITEM_STYLES = {
  itemShapes: RoundedStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#3f3f3f',
};
