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
    <div className="flex gap-8 items-center pl-[5%]">
      <div className="flex justify-end w-[38%]">
        <Text size="lg">{getRatingTitle(ratingKey)}</Text>
      </div>
      <div className="w-[55%]">
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
