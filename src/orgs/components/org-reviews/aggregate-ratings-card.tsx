import { DetailsPanelCardWrapper } from '~/shared/components/details-panel/card-wrapper';
import { Heading } from '~/shared/components/heading';

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

  // const ratings = Object.entries({
  //   benefits: null,
  //   careerGrowth: 4.5,
  //   diversityInclusion: 3.9,
  //   management: 3.4,
  //   product: 3.3,
  //   compensation: 4.9,
  //   onboarding: 4.6,
  //   workLifeBalance: null,
  // }).filter(([, rating]) => rating !== null) as [string, number][];

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
            <p>{rating.toFixed(1)}</p>
            {/* <Rating
              count={1}
              fractions={5}
              value={(rating ?? 0) / 5}
              color="gold"
            /> */}
            <p className="shrink-0">
              {ORG_RATING_LABELS[label as keyof typeof ORG_RATING_LABELS]}
            </p>
          </div>
        ))}
      </div>

      {showInfos && <>{actions}</>}
    </DetailsPanelCardWrapper>
  );
};

const HEADING_TEXT = 'Aggregate Ratings';
