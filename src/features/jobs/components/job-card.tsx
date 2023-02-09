import Image from 'next/image';
import type { MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import type { JobPost } from '~/core/interfaces';
import { createProjectTags } from '~/features/projects/utils';
import { Button } from '~/shared/components';

import { createJobTags } from '../utils';


const cvaJobCard = cva(
  [
    'w-full space-y-4 overflow-hidden rounded-3xl bg-white/5 p-5 text-ivory cursor-pointer',
  ],
  {
    variants: {
      isActive: {
        true: 'bg-gradient-to-l from-primary to-secondary',
      },
    },
  },
);

interface Props {
  post: JobPost;
  isActive: boolean;
  onClick: MouseEventHandler;
}

export const JobCard = ({ post, isActive, onClick }: Props) => {
  const { details: job, created, org, projects } = post;

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
    <div className={cvaJobCard({ isActive })} onClick={onClick}>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-medium'>{title}</h2>
        <div className='flex items-center space-x-2'>
          <span className='text-sm'>{created}</span>
          <Button>bookmark</Button>
        </div>
      </div>

      <div className='flex space-x-8 border-b border-white/5 pb-4 text-sm'>
        {tags.map((tag) => (
          <div key={tag.text} className='flex items-center'>
            <div className='mr-2'>{tag.icon}</div>
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>

      <div className='flex space-x-5 border-b border-white/5 pb-4'>
        {skills.map((tech) => (
          <div key={tech.name} className='relative flex self-start rounded-sm border border-white	p-1'>
            <span className='text-sm font-semibold'>{tech.name}</span>
            <div className='absolute right-0 top-0 -mt-2 -mr-2 h-4 w-4 rounded-full bg-white'>{tech.isChecked}</div>
          </div>
        ))}
        <Button>Sign Up to See Matches</Button>
      </div>

      <div className='flex items-center space-x-5 border-b border-white/5 pb-4'>
        <Image
          src={org.avatar}
          width="32"
          height="32"
          alt={org.name}
        />
        <h3 className='font-semibold'>{org.name}</h3>
        <div className='text-sm'>Funding: {org.funding.date}</div>
      </div>

      {project && (
        <div className=''>
          <div className='flex items-center space-x-5'>
            <Image
              src={project.avatar}
              width="32"
              height="32"
              alt={project.name}
            />
            <h3 className='font-semibold'>{project.name}</h3>
          </div>
          <div className='flex pt-4 text-sm'>
            {project.chains.map((chain) => (
              <div key={chain.name} className='flex'>
                <Image
                  src={chain.avatar}
                  width="32"
                  height="32"
                  alt={chain.name}
                />
                <p>{chain.name}</p>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap pt-4 text-sm'>
            {projectTags.length > 0 &&
              projectTags.map((tag) => (
                <div key={tag.text} className='mr-4 mb-2 flex items-center'>
                  <div className='pr-2'>{tag.icon}</div>
                  <p>{tag.text}</p>
                  <p>{tag.link}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
