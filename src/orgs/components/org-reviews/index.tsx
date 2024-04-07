import { OrgDetails } from '~/orgs/core/schemas';

import { AggregateRatingsCard } from './aggregate-ratings-card';
import { AnonReview } from './anon-review';
import { InfoTexts } from './info-texts';
import { ReviewButton } from './review-button';
import { ShareButton } from './share-button';
import { StaffReviewList } from './staff-review-list';

interface Props {
  org: OrgDetails;
}

export const OrgReviews = ({ org }: Props) => {
  const { orgId, aggregateRatings, reviews } = org;

  const showAnonReview = org.reviewCount === 0;
  const hasRating = Object.values(org.aggregateRatings).some(
    (n) => n !== null && n !== 0,
  );

  const actions = (
    <div className="flex gap-4">
      <ReviewButton orgId={orgId} />
      <ShareButton orgId={orgId} />
    </div>
  );

  const infoTexts = <InfoTexts />;

  return (
    <div className="flex flex-col gap-6">
      {showAnonReview && <AnonReview actions={actions} infoTexts={infoTexts} />}

      {hasRating && (
        <AggregateRatingsCard
          showInfos={!showAnonReview}
          actions={actions}
          infoTexts={infoTexts}
          aggregateRatings={aggregateRatings}
        />
      )}

      <StaffReviewList orgId={orgId} reviews={reviews} />
    </div>
  );
};
