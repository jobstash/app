import { memo } from 'react';

import { type ProjectInfo } from '@jobstash/shared/core';

import JobCardProject from './job-card-project';

interface Props {
  projects: ProjectInfo[];
}

const JobCardProjects = ({ projects }: Props) => {
  if (projects.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {projects.map((project) => (
        <JobCardProject key={project.id} project={project} />
      ))}
    </div>
  );
};

export default memo(JobCardProjects);
