import { Rating } from '@mantine/core';

import { OrgDetails } from '@jobstash/organizations/core';

import { CalendarIcon, CardSet, Heading, Text } from '@jobstash/shared/ui';

import RightPanelCardBorder from './right-panel-card-border';

interface Props {
  org: OrgDetails;
}

const RightPanelReviews = ({ org }: Props) => (
  <div className="flex flex-col gap-4">
    <RightPanelCardBorder>
      <div className="flex flex-col p-6 gap-6">
        <Heading size="md" fw="semibold">
          Aggregate Ratings
        </Heading>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          {Object.entries(org.aggregateRatings).map(([label, rating]) => (
            <div key={label} className="flex items-center gap-2">
              <Text fw="bold">{(rating ?? 0).toFixed(1)}</Text>
              <Rating
                count={1}
                fractions={5}
                value={(rating ?? 0) / 10}
                color="gold"
              />
              <Text>{label}</Text>
            </div>
          ))}
        </div>
      </div>
    </RightPanelCardBorder>

    {org.reviews.map(({ timestamp, headline, pros, cons }) => (
      <RightPanelCardBorder key={headline}>
        <div className="flex flex-col p-6 gap-4">
          <div className="flex flex-col gap-2">
            <Heading size="md" fw="semibold">
              {headline}
            </Heading>
            <CardSet icon={<CalendarIcon />}>{timestamp.toString()}</CardSet>
          </div>

          <hr className="border-t border-white/10" />

          <div className="flex flex-col gap-2 self-stretch">
            <Heading size="sm" fw="semibold">
              Pros
            </Heading>
            <Text color="dimmed">{pros}</Text>
          </div>

          <div className="flex flex-col gap-2 self-stretch">
            <Heading size="sm" fw="semibold">
              Cons
            </Heading>
            <Text color="dimmed">{cons}</Text>
          </div>
        </div>
      </RightPanelCardBorder>
    ))}
  </div>
);

export default RightPanelReviews;
