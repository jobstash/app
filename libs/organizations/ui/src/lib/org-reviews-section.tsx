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
        Aggregate Ratings from verified staff
      </Heading>

      <Text color="dimmed">
        Here is what verified staff have to say about their experience at this
        organization.
      </Text>

      <Text color="dimmed">
        If you worked here and have public commit history in this organizations
        github, or have an organization email account, please leave an anonymous
        review for this organization. It&#39;s easy: Click the button below!
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
        Only current and former staff associated with the org can leave
        anonymous reviews.
      </Text>

      <Text color="dimmed">
        If you worked here and have public commit history in this organizations
        github, or have an organization email account, please leave an anonymous
        review for this organization. It&#39;s easy: Click the button below!
      </Text>

      <div className="flex gap-x-4">
        <OrgReviewSigninButton orgId={org.orgId} />
        <OrgReviewShareButton org={org} />
      </div>
    </div>
  </RightPanelCardBorder>
);
