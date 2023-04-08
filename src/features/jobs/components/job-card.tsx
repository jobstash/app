import Image from 'next/image';
import { MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import {
  Button,
  Heading,
  IconHolder,
  LogoTitle,
  SkillHolder,
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
        true: 'bg-gradient-to-l from-primary to-tertiary hover:after:hidden cursor-default',
      },
    },
  },
);

export const JobCard = ({ listing, isActive, onClick }: Props) => {
  const { jobpost, organization: org, project, technologies } = listing;

  const { jobTitle, jobCreatedTimestamp } = jobpost;

  const tags = createJobTags(jobpost);
  const projectTags = createProjectTags(project);

  return (
    <div className={cvaJobCard({ isActive })} onClick={onClick}>
      <div className="flex items-center justify-between">
        <Heading size="md" fw="semibold">
          {jobTitle}
        </Heading>
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

      {technologies.length > 0 && (
        <div className="flex justify-between space-x-4 border-b border-white/5 py-4">
          <div className="-mb-3 flex grow flex-wrap">
            {technologies.map(({ name, id }) => (
              <SkillHolder key={id} isChecked={false} className="mr-4">
                {name}
              </SkillHolder>
            ))}
          </div>
          <div className="shrink-0 self-start">
            <Button>Sign Up to See Matches</Button>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-8 py-4 last:pb-0">
        <LogoTitle title={org.name} avatarProps={{ src: '', alt: org.name }} />
      </div>

      {project ? (
        <div className="border-t border-white/5 pt-4">
          <div className="flex">
            <LogoTitle
              title={project.name}
              avatarProps={{ src: project.logo, alt: project.name }}
            />
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
