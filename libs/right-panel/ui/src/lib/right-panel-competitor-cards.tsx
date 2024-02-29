import { memo } from 'react';

import { type Competitor } from '@jobstash/competitors/core';

import RightPanelCompetitorCard from './right-panel-competitor-card';

interface Props {
  competitors: Competitor[];
}

const RightPanelCompetitorCards = ({ competitors }: Props) => {
  if (competitors.length === 0) return null;

  return (
    <div className="flex flex-col space-y-4">
      {competitors.map((competitor) => (
        <RightPanelCompetitorCard
          key={`${competitor.id}-${competitor.orgId}`}
          competitor={competitor}
        />
      ))}
    </div>
  );
};

export default memo(RightPanelCompetitorCards);
