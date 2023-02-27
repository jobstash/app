import Image from 'next/image';
import { MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import {
  Button,
  CardHeading,
  ChainHeading,
  IconHolder,
  SkillHolder,
} from '~/shared/components';

import { JobPost } from '../core/interfaces';
import { createJobTags } from '../utils';
import { createProjectTags } from '../utils/create-project-tags';

interface Props {
  listing: JobPost;
  isActive: boolean;
  onClick: MouseEventHandler;
}

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

export const JobCard = ({ listing, isActive, onClick }: Props) => {
  const { jobpost, organization: org, technologies, project } = listing;

  const { jobTitle, jobCreatedTimestamp } = jobpost;

  const tags = createJobTags(jobpost);
  const projectTags = createProjectTags(project);

  return (
    <div className={cvaJobCard({ isActive })} onClick={onClick}>
      <div className="flex items-center justify-between">
        <CardHeading>{jobTitle}</CardHeading>
        <div className="flex items-center space-x-3">
          <span className="text-sm">{jobCreatedTimestamp}</span>
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
        {tags.map(({ text, link, iconText }) => (
          <IconHolder key={text} link={link} icon={iconText}>
            {text}
          </IconHolder>
        ))}
      </div>

      <div className="flex justify-between space-x-4 border-b border-white/5 py-4">
        <div className="-mb-3 flex grow flex-wrap">
          {technologies.map((tech) => (
            <SkillHolder key={tech} isChecked={false} className="mr-4">
              {tech}
            </SkillHolder>
          ))}
        </div>
        <Button>Sign Up to See Matches</Button>
      </div>

      <div className="flex items-center py-4 last:pb-0">
        {/** Note: waiting for backend/middleware to provide org avatars (Uniswap labs for now)  */}
        <ChainHeading avatar="/orgs/Uniswap Labs.png" alt={org.name}>
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
          {/** Note: waiting for backend/middleware to provide last_funding_data  */}
          Last Funding: last_funding_data
        </div>
        <div className="flex items-center text-sm">
          <Image
            src="/icons/funding.svg"
            width="13"
            height="13"
            alt="funding"
            className="mr-2"
          />
          {/** Note: waiting for backend/middleware to provide funding_data  */}
          Funding: funding_data
        </div>
      </div>

      {project && (
        <div className="border-t border-white/5 pt-4">
          <div className="flex">
            <ChainHeading avatar={project.logo} alt={project.name}>
              {project.name}
            </ChainHeading>
            {/** Note: waiting for backend/middleware to provide the chains */}
            {/* <ChainHolder /> */}
          </div>

          {projectTags.length > 0 && (
            <div className="-mb-2 flex flex-wrap pt-4 text-sm">
              {projectTags.length > 0 &&
                projectTags.map(({ text, iconText, link }) => (
                  <IconHolder
                    key={text}
                    className="mr-6 mb-2"
                    link={link}
                    icon={iconText}
                  >
                    {text}
                  </IconHolder>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
