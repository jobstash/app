import type { MouseEventHandler } from 'react';

import type { JobListing } from '~/core/interfaces';
import { createProjectTags } from '~/features/projects/utils';
import { Button } from '~/shared/components';

import { createJobTags } from '../utils';

interface Props {
  listing: JobListing;
  isActive: boolean;
  onClick: MouseEventHandler;
}

// *** UNSTYLED ***
export const JobCard = ({ listing, isActive, onClick }: Props) => {
  const { details: job, created, org, projects } = listing;

  if (!job) return null;

  const { title } = job;

  const tags = createJobTags(job);

  const skills = [
    ...job.skills.main,
    ...job.skills.hasMentor,
    ...job.skills.shared,
  ];

  const project = projects.length > 0 ? projects[0] : null;

  const { top, mid, bottom } = project
    ? createProjectTags(project)
    : { top: [], mid: [], bottom: [] };

  const projectTags = [...top, ...mid, ...bottom];

  return (
    <div onClick={onClick}>
      <div>
        <p>{title}</p>
        <p>{created}</p>
        <Button>bookmark</Button>
      </div>

      {tags.map((tag) => (
        <div key={tag.text}>
          {tag.icon}
          <p>{tag.text}</p>
          <p>{tag.link}</p>
        </div>
      ))}

      <hr />

      <div>
        {skills.map((tech) => (
          <div key={tech.name}>
            <p>{tech.name}</p>
            <p>{tech.isChecked}</p>
          </div>
        ))}
        <Button>Sign Up to See Matches</Button>
      </div>

      <hr />

      <div>
        <p>{org.name}</p>
        <p>{org.avatar}</p>
        <p>Funding: {org.funding.date}</p>
      </div>

      <hr />

      {project && (
        <div>
          <div>
            <p>{project.name}</p>
            <p>{project.avatar}</p>
          </div>
          <div>
            {project.chains.map((chain) => (
              <div key={chain.name}>
                <p>{chain.name}</p>
                <p>{chain.avatar}</p>
              </div>
            ))}
          </div>
          {projectTags.length > 0 &&
            projectTags.map((tag) => (
              <div key={tag.text}>
                {tag.icon}
                <p>{tag.text}</p>
                <p>{tag.link}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
