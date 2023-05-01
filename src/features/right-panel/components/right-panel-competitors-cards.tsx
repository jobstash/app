import { memo } from 'react';

import type { Competitor } from '~/shared/core/interfaces';

import RightPanelCompetitorCard from './right-panel-competitor-card';

interface Props {
  competitors: Competitor[];
}

const RightPanelCompetitorsCards = ({ competitors }: Props) => {
  if (competitors.length === 0) return null;

  return (
    <>
      {competitors.map((competitor) => (
        <RightPanelCompetitorCard key={competitor.id} competitor={competitor} />
      ))}
    </>
  );
};

export default memo(RightPanelCompetitorsCards);
