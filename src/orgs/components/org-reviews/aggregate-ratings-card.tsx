import { DetailsPanelCardWrapper } from '~/shared/components/details-panel/card-wrapper';
import { Heading } from '~/shared/components/heading';

import { OrgDetails } from '~/orgs/core/schemas';

import { RatingList } from './rating-list';

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
  return (
    <DetailsPanelCardWrapper>
      <Heading text={HEADING_TEXT} />

      {showInfos && <>{infoTexts}</>}

      <RatingList rating={aggregateRatings} />

      {showInfos && <>{actions}</>}
    </DetailsPanelCardWrapper>
  );
};

const HEADING_TEXT = 'Aggregate Ratings';
