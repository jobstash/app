import { ORG_RATING_LABELS } from '@jobstash/organizations/core';

import RatingsItem from './ratings-item';

const RatingsList = () => (
  <div className="flex flex-col gap-6">
    {Object.keys(ORG_RATING_LABELS).map((ratingKey) => (
      <RatingsItem
        key={ratingKey}
        ratingKey={ratingKey as keyof typeof ORG_RATING_LABELS}
      />
    ))}
  </div>
);

export default RatingsList;
