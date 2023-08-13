import { Rating } from '@mantine/core';

import { type ProfileOrgReviewRating } from '@jobstash/profile/core';

import { useRatingContext } from '@jobstash/profile/state';

import { Text } from '@jobstash/shared/ui';

interface Props {
  ratingKey: keyof ProfileOrgReviewRating;
}

const RatingItem = ({ ratingKey }: Props) => {
  const { currentRating, setCurrentRating, getRatingTitle } =
    useRatingContext();

  return (
    <div className="flex gap-8 items-center">
      <div className="flex justify-end w-[30%]">
        <Text size="lg">{getRatingTitle(ratingKey)}</Text>
      </div>
      <div className="w-[70%]">
        <Rating
          size="xl"
          value={currentRating[ratingKey] ?? 0}
          onChange={(v) =>
            setCurrentRating((prev) => ({ ...prev, [ratingKey]: v }))
          }
        />
      </div>
    </div>
  );
};

export default RatingItem;
