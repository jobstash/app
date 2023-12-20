import { Rating } from '@mantine/core';

import {
  ORG_RATING_LABELS,
  type OrgDetails,
} from '@jobstash/organizations/core';

import { RightPanelCardBorder } from '@jobstash/right-panel/ui';
import { EmptyStarIcon, Heading, Text } from '@jobstash/shared/ui';

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

  return (
    <div className="flex flex-col gap-4">
      {/* <pre>
        {JSON.stringify(
          {
            count: org.reviewCount,
            reviews: org.reviews,
          },
          undefined,
          '\t',
        )}
      </pre> */}
      {noReviews && <LeaveReviewSection org={org} />}
      {hasRating && <AggregateSection org={org} />}
      {org.reviews.map((orgReview) => (
        <OrgStaffReview
          key={`${JSON.stringify(orgReview.review)}`}
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
        We need more people to review this organization, you know anyone who
        worked here, please invite them to review this organization. Share the
        link above blabla
      </Text>

      <hr className="border-t border-white/10" />

      <div className="flex flex-wrap gap-x-12 gap-y-4">
        {Object.entries(org.aggregateRatings).map(([label, rating]) => (
          <div key={label} className="flex items-center gap-2">
            <Text fw="bold">
              {rating && rating > 0 ? rating.toFixed(1) : 'n/d'}
            </Text>
            {rating ? (
              <Rating
                count={1}
                fractions={5}
                value={(rating ?? 0) / 5}
                color="gold"
              />
            ) : (
              <EmptyStarIcon />
            )}
            <Text>
              {ORG_RATING_LABELS[label as keyof typeof ORG_RATING_LABELS]}
            </Text>
          </div>
        ))}
      </div>

      <OrgReviewSigninButton />
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
        We need more people to review this organization, you know anyone who
        worked here, please invite them to review this organization. Share the
        link above blabla
      </Text>

      <div className="flex gap-x-4">
        <OrgReviewSigninButton />
        <OrgReviewShareButton org={org} />
      </div>
    </div>
  </RightPanelCardBorder>
);
