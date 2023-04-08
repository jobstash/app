import Image from 'next/image';
import { MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import {
  Button,
  CardSet,
  Heading,
  LogoTitle,
  TechWrapper,
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

      <div className="flex flex-wrap [&>*]:mr-4">
        {tags.map(({ text, link, icon }) => (
          <CardSet key={text} link={link} icon={icon}>
            {capitalize(text)}
          </CardSet>
        ))}
      </div>

      {technologies.length > 0 && (
        <div className="flex justify-between space-x-4 border-b border-white/5 py-4">
          <div className="flex flex-wrap gap-4">
            {technologies.map(({ name, id }) => (
              <TechWrapper key={id} id={id} isActive={isActive}>
                {name}
              </TechWrapper>
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
            <div className="flex flex-wrap [&>*]:mr-4">
              {projectTags.length > 0 &&
                projectTags.map(({ text, icon, link }) => (
                  <CardSet key={text} link={link} icon={icon}>
                    {text}
                  </CardSet>
                ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
