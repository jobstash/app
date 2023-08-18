import {
  ProfileOrgReviewRating,
  RATING_TITLE_MAP,
} from '@jobstash/profile/core';

import RatingsItem from './ratings-item';

const RatingsList = () => (
  <div className="flex flex-col gap-6">
    {Object.keys(RATING_TITLE_MAP).map((ratingKey) => (
      <RatingsItem
        key={ratingKey}
        ratingKey={ratingKey as keyof ProfileOrgReviewRating}
      />
    ))}
  </div>
);

export default RatingsList;
