import { memo } from 'react';

import type { Project } from '~/shared/core/interfaces';

import JobCardProject from './job-card-project';

interface Props {
  projects: Project[];
}

const JobCardProjects = ({ projects }: Props) => {
  if (projects.length === 0) return null;

  return (
    <>
      <hr className="border-t border-white/10" />
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <JobCardProject key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export default memo(JobCardProjects);
