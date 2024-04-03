import { OrgDetails } from '~/orgs/core/schemas';

import { LeaveReview } from './leave-review';
import { ReviewButton } from './review-button';
import { ShareButton } from './share-button';

interface Props {
  org: OrgDetails;
}

export const OrgReviews = ({ org }: Props) => {
  const { orgId } = org;

  const noReviews = org.reviewCount === 0;
  const hasRating = Object.values(org.aggregateRatings).some(
    (n) => n !== null && n !== 0,
  );
  const reviews = org.reviews.filter((r) => !!r.review.title);

  return (
    <div className="flex flex-col gap-6">
      {noReviews && (
        <LeaveReview
          reviewButton={<ReviewButton orgId={orgId} />}
          shareButton={<ShareButton orgId={orgId} />}
        />
      )}
      {hasRating && <p>TODO: AggregateSection</p>}
      {reviews.map((r) => (
        <pre key={`${JSON.stringify(r.review)}`}>
          {JSON.stringify({ review: r.review }, undefined, '\t')}
        </pre>
      ))}
    </div>
  );
};
