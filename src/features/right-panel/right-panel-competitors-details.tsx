import { Project } from '~/core/interfaces';

import { RightPanelProjectDetails } from './right-panel-project-details';

interface Props {
  competitors: Project[];
}

export const RightPanelCompetitorsDetails = ({ competitors }: Props) => (
  <div className="space-y-4">
    {competitors.map((competitor) => (
      <RightPanelProjectDetails key={competitor.name} project={competitor} />
    ))}
  </div>
);
