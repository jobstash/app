import { Rating } from '@mantine/core';

import { type OrgDetails } from '@jobstash/organizations/core';

import { RightPanelCardBorder } from '@jobstash/right-panel/ui';
import { EmptyStarIcon, Heading, Text } from '@jobstash/shared/ui';

import OrgReviewShareButton from './org-review-share-button';
import OrgReviewSigninButton from './org-review-signin-button';

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
      {noReviews && <LeaveReviewSection org={org} />}
      {hasRating && <AggregateSection org={org} />}
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
        {sortRatings(org.aggregateRatings).map(([label, rating]) => (
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
            <Text>{labelMapping[label as OrgRatingKey]}</Text>
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

type OrgAggregateRatings = OrgDetails['aggregateRatings'];
type OrgRatingKey = keyof OrgAggregateRatings;
type OrgRatingMapping<T> = Record<OrgRatingKey, T>;

const labelMapping: OrgRatingMapping<string> = {
  management: 'Management',
  careerGrowth: 'Career Growth',
  benefits: 'Benefits',
  workLifeBalance: 'Work Life Balance',
  cultureValues: 'Culture & Values',
  diversityInclusion: 'Diversity & Inclusion',
  interviewProcess: 'Interview Process',
};

const labelPosition: OrgRatingMapping<number> = {
  management: 1,
  careerGrowth: 2,
  benefits: 3,
  workLifeBalance: 4,
  cultureValues: 5,
  diversityInclusion: 6,
  interviewProcess: 7,
};

type LabelPosKey = keyof typeof labelPosition;

const sortRatings = (ratings: OrgAggregateRatings) =>
  Object.entries(ratings).sort(
    ([keyA], [keyB]) =>
      labelPosition[keyA as LabelPosKey] - labelPosition[keyB as LabelPosKey],
  );
