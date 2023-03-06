import Image from 'next/image';
import { MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import {
  Button,
  CardHeading,
  ChainHeading,
  IconHolder,
  SkillHolder,
  TagIcon,
} from '~/shared/components';
import { capitalize, prettyTimestamp } from '~/shared/utils';

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
    'hover:bg-white/10 after:transition-all	 after:content-[""] after:hidden after:h-full after:border after:border-white/20 after:rounded-3xl after:w-full after:absolute after:inset-0 hover:after:block after:z-20',
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
  const { jobpost, organization: org, project } = listing;

  const { jobTitle, jobCreatedTimestamp, hardSkills } = jobpost;

  const tags = createJobTags(jobpost);
  const projectTags = createProjectTags(project);

  return (
    <div className={cvaJobCard({ isActive })} onClick={onClick}>
      <div className="flex items-center justify-between">
        <CardHeading>{jobTitle}</CardHeading>
        <div className="flex items-center space-x-3">
          <span className="text-sm">
            {prettyTimestamp(jobCreatedTimestamp)}
          </span>
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
          <IconHolder key={text} link={link} iconText={iconText}>
            {capitalize(text)}
          </IconHolder>
        ))}
      </div>

      {hardSkills.length > 0 && (
        <div className="flex justify-between space-x-4 border-b border-white/5 py-4">
          <div className="-mb-3 flex grow flex-wrap">
            {hardSkills.map((skill) => (
              <SkillHolder key={skill} isChecked={false} className="mr-4">
                {skill}
              </SkillHolder>
            ))}
          </div>
          <div className="shrink-0 self-start">
            <Button>Sign Up to See Matches</Button>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-8 py-4 last:pb-0">
        {/** Note: waiting for backend/middleware to provide org avatars  */}
        <ChainHeading avatar="" alt={org.name}>
          {org.name}
        </ChainHeading>
        <div className="flex items-center text-sm">
          <TagIcon filename="funding" />
          {/** Note: waiting for backend/middleware to provide last_funding_data  */}
          Last Funding: TBD
        </div>
        <div className="flex items-center text-sm">
          <TagIcon filename="funding" />
          {/** Note: waiting for backend/middleware to provide funding_data  */}
          Funding: TBD
        </div>
      </div>

      {project ? (
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
                    iconText={iconText}
                  >
                    {text}
                  </IconHolder>
                ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
