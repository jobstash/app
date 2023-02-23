import Image from 'next/image';
import { Children, MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import type { JobPost } from '~/core/interfaces';
import { createProjectTags } from '~/features/projects/utils';
import { Button, ChainHeading, ChainHolder } from '~/shared/components';
import { CardHeading } from '~/shared/components';
import { SkillHolder } from '~/shared/components';
import { IconHolder } from '~/shared/components';

import { createJobTags } from '../utils';

const cvaJobCard = cva(
  [
    'w-full overflow-hidden rounded-3xl bg-white/5 p-6 text-ivory cursor-pointer relative transition-all',
    'hover:bg-white/20 after:transition-all	 after:content-[""] after:hidden after:h-full after:border after:border-white after:rounded-3xl after:w-full after:absolute after:inset-0 hover:after:block after:z-20',
  ],
  {
    variants: {
      isActive: {
        true: 'bg-gradient-to-l from-primary to-secondary hover:after:hidden cursor-default',
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
      <div className="flex items-center justify-between">
        <CardHeading>{title}</CardHeading>
        <div className="flex items-center space-x-3">
          <span className="text-sm">{created}</span>
          <Button size="sm">
            <Image
              src="/icons/bookmark.svg"
              width="13"
              height="18"
              alt="bookmark"
            />
          </Button>
        </div>
      </div>

      <div className="flex space-x-8 border-b border-white/5 pt-3 pb-4 text-sm">
        {tags.map((tag) => (
          <IconHolder key={tag.text} link={tag.link} icon={tag.icon}>
            {tag.text}
          </IconHolder>
        ))}
      </div>

      <div className="flex justify-between space-x-4 border-b border-white/5 py-4">
        <div className="-mb-3 flex grow flex-wrap">
          {skills.map((tech) => (
            <SkillHolder key={tech.name} isChecked className="mr-4">
              {tech.name}
            </SkillHolder>
          ))}
        </div>
        <Button>Sign Up to See Matches</Button>
      </div>

      <div className="flex items-center py-4 last:pb-0">
        <ChainHeading avatar={org.avatar} alt={org.name}>
          {org.name}
        </ChainHeading>
        <div className="flex items-center text-sm">
          <Image
            src="/icons/funding.svg"
            width="13"
            height="13"
            alt="funding"
            className="mr-2"
          />
          Funding: {org.funding.date}
        </div>
      </div>

      {project && (
        <div className="border-t border-white/5 pt-4">
          <div className="flex">
            <ChainHeading avatar={project.avatar} alt={project.name}>
              {project.name}
            </ChainHeading>
            <ChainHolder />
            {/* to be done */}
            {/* <div className="flex text-sm">
              {project.chains.map((chain) => (
                <div key={chain.name} className="flex">
                  <Image
                    src={chain.avatar}
                    width="32"
                    height="32"
                    alt={chain.name}
                  />
                  <p className="sr-only">{chain.name}</p>
                </div>
              ))}
            </div> */}
          </div>
          <div className="-mb-2 flex flex-wrap pt-4 text-sm">
            {projectTags.length > 0 &&
              projectTags.map((tag) => (
                <IconHolder
                  key={tag.text}
                  className="mr-6 mb-2"
                  link={tag.link}
                  icon={tag.icon}
                >
                  {tag.text}
                </IconHolder>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
