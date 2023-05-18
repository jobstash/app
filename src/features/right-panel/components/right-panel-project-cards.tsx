import { memo } from 'react';

import clsx from 'clsx';

import type { Project } from '~/shared/core/interfaces';

import { RightPanelProjectCard } from './right-panel-project-card';

interface Props {
  projects: Project[];
}

const RightPanelProjectCards = ({ projects }: Props) => (
  <div className="flex flex-col space-y-4">
    {projects.map((project) => (
      <RightPanelProjectCard key={project.id} project={project} />
    ))}
  </div>
);

export default memo(RightPanelProjectCards);
