import { type OrgDetails } from '@jobstash/organizations/core';

import { RightPanelCardBorder } from '@jobstash/right-panel/ui';
import { Heading, Text } from '@jobstash/shared/ui';

import OrgRatingList from './org-rating-list';
import OrgReviewShareButton from './org-review-share-button';
import OrgReviewSigninButton from './org-review-signin-button';
import OrgStaffReview from './org-staff-review';

interface Props {
  org: OrgDetails;
}

const OrgReviewsSection = ({ org }: Props) => {
  const noReviews = org.reviewCount === 0;
  const hasRating = Object.values(org.aggregateRatings).some(
    (n) => n !== null && n !== 0,
  );

  const reviews = org.reviews.filter((r) => Boolean(r.review.title));

  return (
    <div className="flex flex-col gap-4">
      {noReviews && <LeaveReviewSection org={org} />}
      {hasRating && <AggregateSection org={org} />}
      {reviews.map((orgReview) => (
        <OrgStaffReview
          key={`${JSON.stringify(orgReview.review)}`}
          orgId={org.orgId}
          orgReview={orgReview}
        />
      ))}
    </div>
  );
};

export default OrgReviewsSection;

const AggregateSection = ({ org }: { org: OrgDetails }) => (
  <RightPanelCardBorder>
    <div className="flex flex-col p-6 gap-6">
      <Heading size="lg" fw="semibold">
        Aggregate Ratings
      </Heading>

      <Text color="dimmed">
        Only devs associated with the org can review it.
      </Text>

      <Text color="dimmed">
        If you know anyone who works or worked here here, please invite them to
        review this organization. It&#39;s easy: Share the link above with them!
      </Text>

      <hr className="border-t border-white/10" />

      <OrgRatingList orgRating={org.aggregateRatings} />

      <OrgReviewSigninButton orgId={org.orgId} />
    </div>
  </RightPanelCardBorder>
);

const LeaveReviewSection = ({ org }: { org: OrgDetails }) => (
  <RightPanelCardBorder>
    <div className="flex flex-col p-6 gap-6">
      <Heading size="lg" fw="semibold">
        Leave a Review
      </Heading>

      <Text color="dimmed">
        Only devs associated with the org can review it.
      </Text>

      <Text color="dimmed">
        If you know anyone who works or worked here here, please invite them to
        review this organization. It&#39;s easy: Share the link above with them!
      </Text>

      <div className="flex gap-x-4">
        <OrgReviewSigninButton orgId={org.orgId} />
        <OrgReviewShareButton org={org} />
      </div>
    </div>
  </RightPanelCardBorder>
);
