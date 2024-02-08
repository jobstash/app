import { Rating } from '@mantine/core';

import { type OrgRating } from '@jobstash/organizations/core';

import { useProfileOrgReviewFormContext } from '@jobstash/profile/state';
import { useMediaQuery } from '@jobstash/shared/state';

import { Text } from '@jobstash/shared/ui';

interface Props {
  ratingKey: keyof OrgRating;
}

const RatingItem = ({ ratingKey }: Props) => {
  const { rating, setRating, getRatingTitle } =
    useProfileOrgReviewFormContext();

  const isXS = useMediaQuery('(max-width: 374px)');

  return (
    <div className="flex gap-8 items-center pl-[5%]">
      <div className="flex md:justify-end w-[38%]">
        <Text className="md:text-lg">{getRatingTitle(ratingKey)}</Text>
      </div>
      <div className="w-[55%] flex justify-end sm:justify-start">
        <Rating
          size={isXS ? 'md' : 'lg'}
          value={rating[ratingKey] ?? 0}
          color="gold"
          onChange={(v) => setRating((prev) => ({ ...prev, [ratingKey]: v }))}
        />
      </div>
    </div>
  );
};

export default RatingItem;
