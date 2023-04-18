import Image from 'next/image';
import { MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import {
  BankIcon,
  BookmarkIcon,
  Button,
  CardSet,
  Heading,
  LogoTitle,
  MoneyIcon,
  TechWrapper,
} from '~/shared/components';
import { capitalize, prettyTimestamp } from '~/shared/utils';

import { Job } from '../core/interfaces';
import {
  createJobCardOrgTags,
  createJobCardProjectTags,
  createJobTags,
} from '../utils';

interface Props {
  listing: Job;
  isActive: boolean;
  onClick: MouseEventHandler;
}

const cvaJobCard = cva(
  [
    'flex flex-col p-6 gap-2.5 rounded-3xl bg-white/5',
    'cursor-pointer hover:bg-white/10',
    'border border-transparent hover:border-white/20',
  ],
  {
    variants: {
      isActive: {
        true: 'bg-gradient-to-l from-primary to-tertiary hover:after:hidden cursor-default border border-box border-none p-[25px] hover:border-transparent',
      },
    },
  },
);

export const JobCard = ({ listing, isActive, onClick }: Props) => {
  const { jobpost, organization: org, project, technologies } = listing;

  const { jobTitle, jobCreatedTimestamp } = jobpost;

  const tags = createJobTags(jobpost);
  const orgTags = createJobCardOrgTags(org);
  const { projectInfoTags, projectTvlTags, projectAuditTags } =
    createJobCardProjectTags(project);

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
          <div className="z-30">
            <Button size="sm" variant="translucent" onClick={onClickBookmark}>
              <BookmarkIcon />
            </Button>
          </div>
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
        <>
          <div className="flex h-4 flex-col justify-center">
            <hr className="border-t border-white/10" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {technologies.map(({ name, id }) => (
                <TechWrapper key={id} id={id} isActive={isActive}>
                  {name}
                </TechWrapper>
              ))}
            </div>
            <div className="z-30 shrink-0 self-center">
              <Button variant="translucent" onClick={onClickSeeMatches}>
                Sign Up to See Matches
              </Button>
            </div>
          </div>
        </>
      )}

      <div className="flex h-4 flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>

      <div className="flex h-8 items-center gap-x-8">
        <LogoTitle
          title={org.name}
          avatarProps={{
            src: `https://www.google.com/s2/favicons?domain=${org.url}&sz=128`,
            alt: org.name,
          }}
        />
        {orgTags.length > 0 &&
          orgTags.map(({ text, icon, link }) => (
            <CardSet key={text} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
      </div>

      {project ? (
        <>
          <div className="flex h-4 flex-col justify-center">
            <hr className="border-t border-white/10" />
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <LogoTitle
              title={project.name}
              avatarProps={{ src: project.logo, alt: project.name }}
            />
            {projectInfoTags.length > 0 &&
              projectInfoTags.map(({ text, icon, link }) => (
                <CardSet key={text} link={link} icon={icon}>
                  {text}
                </CardSet>
              ))}
          </div>

          {projectTvlTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-8">
              {projectTvlTags.map(({ text, icon, link }) => (
                <CardSet key={text} link={link} icon={icon}>
                  {text}
                </CardSet>
              ))}
            </div>
          )}

          {projectAuditTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-8">
              {projectAuditTags.map(({ text, icon, link }) => (
                <CardSet key={text} link={link} icon={icon}>
                  {text}
                </CardSet>
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

const onClickSeeMatches: MouseEventHandler = (e) => {
  e.stopPropagation();
  // eslint-disable-next-line no-alert
  alert('TODO');
};

const onClickBookmark: MouseEventHandler = (e) => {
  e.stopPropagation();
  // eslint-disable-next-line no-alert
  alert('TODO');
};
