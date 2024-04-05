import { Rating, RoundedStar } from '@smastrom/react-rating';

import { DetailsPanelCardWrapper } from '~/shared/components/details-panel/card-wrapper';
import { Heading } from '~/shared/components/heading';
import { Text } from '~/shared/components/text';

import { ORG_RATING_LABELS } from '~/orgs/core/constants';
import { OrgDetails } from '~/orgs/core/schemas';

interface Props {
  showInfos: boolean;
  infoTexts: React.ReactNode;
  actions: React.ReactNode;
  aggregateRatings: OrgDetails['aggregateRatings'];
}

export const AggregateRatingsCard = ({
  showInfos,
  infoTexts,
  actions,
  aggregateRatings,
}: Props) => {
  const ratings = Object.entries(aggregateRatings).filter(
    ([, rating]) => rating !== null,
  ) as [string, number][];

  return (
    <DetailsPanelCardWrapper>
      <Heading text={HEADING_TEXT} />

      {showInfos && <>{infoTexts}</>}

      <div className="grid-cold-1 2xl:grid-cols-3 grid gap-3 sm:grid-cols-2">
        {ratings.map(([label, rating]) => (
          <div
            key={label}
            className="flex shrink-0 flex-wrap items-center justify-start gap-2"
          >
            <Text
              className="text-base font-bold text-white"
              text={rating.toFixed(1)}
            />
            <Rating
              readOnly
              value={rating}
              style={{ maxWidth: 120 }}
              itemStyles={RATING_ITEM_STYLES}
            />

            <Text
              className="shrink-0 text-base text-white"
              text={ORG_RATING_LABELS[label as keyof typeof ORG_RATING_LABELS]}
            />
          </div>
        ))}
      </div>

      {showInfos && <>{actions}</>}
    </DetailsPanelCardWrapper>
  );
};

const HEADING_TEXT = 'Aggregate Ratings';

const RATING_ITEM_STYLES = {
  itemShapes: RoundedStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#3f3f3f',
};
