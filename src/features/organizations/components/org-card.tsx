import Image from 'next/image';
import type { MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import type { OrgPost } from '~/core/interfaces';
import {
  Button,
  ChainHeading,
  IconHolder,
  SkillHolder,
} from '~/shared/components';

import { createOrgTags } from '../utils';

const cvaOrgCard = cva(
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
  post: OrgPost;
  isActive: boolean;
  onClick: MouseEventHandler;
}

export const OrgCard = ({ post, isActive, onClick }: Props) => {
  const { details, created } = post;

  const { name, avatar, location, techs } = details;
  const tags = createOrgTags(post);

  return (
    <div className={cvaOrgCard({ isActive })} onClick={onClick}>
      <div className="flex items-center justify-between">
        <ChainHeading
          avatar={avatar}
          alt={name}
          iconSize="40"
          location={location}
        >
          {name}
        </ChainHeading>
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
      <div className="mt-4 flex flex-wrap border-t border-white/5 py-4 text-sm">
        {tags.map((tag) => (
          <IconHolder
            key={tag.text}
            link={tag.link}
            icon={tag.icon}
            className="mr-6"
          >
            {tag.text}
          </IconHolder>
        ))}
      </div>
      <div className="flex justify-between space-x-4 border-t border-white/5 pt-4">
        <div className="-mb-3 flex grow flex-wrap ">
          {techs.map((tech) => (
            <SkillHolder key={tech.name} isChecked className="mr-4">
              {tech.name}
            </SkillHolder>
          ))}
        </div>
        <Button>Sign Up to See Matches</Button>
      </div>
    </div>
  );
};
