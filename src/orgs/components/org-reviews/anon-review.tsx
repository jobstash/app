import React from 'react';

import { DetailsPanelCardWrapper } from '~/shared/components/details-panel/card-wrapper';
import { Heading } from '~/shared/components/heading';

interface Props {
  actions: React.ReactNode;
  infoTexts: React.ReactNode;
}

export const AnonReview = ({ actions, infoTexts }: Props) => {
  return (
    <DetailsPanelCardWrapper>
      <Heading text={HEADING_TEXT} />

      {infoTexts}

      {actions}
    </DetailsPanelCardWrapper>
  );
};

const HEADING_TEXT = 'Leave a Review';
