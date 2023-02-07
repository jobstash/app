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
    <div className="w-full space-y-4 overflow-hidden rounded-3xl bg-white/5 p-5 text-ivory" onClick={onClick}>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-medium'>{title}</h2>
        <div className='flex items-center space-x-2'>
          <span className='text-sm'>{created}</span>
          <Button>bookmark</Button>
        </div>
      </div>

      <div className='flex space-x-8 border-b border-white/5 text-sm'>
        {tags.map((tag) => (
          <div key={tag.text} className='flex items-center'>
            <div className='mr-2'>{tag.icon}</div>
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>

      <div className='flex border-b border-white/5'>
        {skills.map((tech) => (
          <div key={tech.name} className='flex'>
            <p>{tech.name}</p>
            <p>{tech.isChecked}</p>
          </div>
        ))}
        <Button>Sign Up to See Matches</Button>
      </div>

      <div className='flex border-b border-white/5'>
        <p>{org.name}</p>
        <p>{org.avatar}</p>
        <p>Funding: {org.funding.date}</p>
      </div>

      {project && (
        <div className='flex border-b border-white/5'>
          <div className='flex'>
            <p>{project.name}</p>
            <p>{project.avatar}</p>
          </div>
          <div className='flex'>
            {project.chains.map((chain) => (
              <div key={chain.name} className='flex'>
                <p>{chain.name}</p>
                <p>{chain.avatar}</p>
              </div>
            ))}
          </div>
          {projectTags.length > 0 &&
            projectTags.map((tag) => (
              <div key={tag.text} className='flex'>
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
