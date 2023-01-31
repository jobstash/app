import type { Project } from '~/core/interfaces';

import { RightPanelProject } from './right-panel-project';

interface Props {
  competitors: Project[];
}

export const RightPanelCompetitors = ({ competitors }: Props) => (
  <div className="space-y-4">
    {competitors.map((competitor) => (
      <RightPanelProject key={competitor.name} project={competitor} />
    ))}
  </div>
);
