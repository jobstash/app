import Image from 'next/image';
import type { MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import {
  Button,
  CardHeading,
  ChainHeading,
  ChainHolder,
  IconHolder,
  SkillHolder,
} from '~/shared/components';
import type { ProjectPost } from '~/shared/core/interfaces';

import { createProjectTags } from '../utils';

const cvaProjectCard = cva(
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
  post: ProjectPost;
  isActive: boolean;
  onClick: MouseEventHandler;
}

export const ProjectCard = ({ post, isActive, onClick }: Props) => {
  const { details, created } = post;

  const { name, avatar, techs, chains, token } = details;

  const { top, mid, bottom } = createProjectTags(details);

  return (
    <div className={cvaProjectCard({ isActive })} onClick={onClick}>
      <div className="flex items-center justify-between">
        <CardHeading>{name}</CardHeading>
        <div className="flex items-center space-x-2">
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
      <div className="flex flex-wrap border-b border-white/5 pt-4 pb-2 text-sm">
        {[...top, ...mid].map((tag) => (
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
      <div className="flex flex-wrap border-b border-white/5 pt-4 pb-2 text-sm">
        {[...bottom].map((tag) => (
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

      <div className="flex space-x-4 border-b border-white/5 py-4">
        <div className="-mb-3 flex grow flex-wrap">
          {techs.map((tech) => (
            <SkillHolder key={tech.name} isChecked className="mr-4">
              {tech.name}
            </SkillHolder>
          ))}
        </div>
        <Button>Sign Up to See Matches</Button>
      </div>

      <div className="flex flex-wrap space-x-4 pt-4">
        <ChainHeading avatar={avatar} alt={name} iconSize="32">
          {name}
        </ChainHeading>
        {/* Here we should use the ChainHolder compoenent */}
        {/* Need to understand how to structure ChainHolder Component and how to pass the right prop to it  */}
        <div className="flex text-sm">
          {chains.map((chain) => (
            <div key={chain.name} className="-ml-2 flex">
              <Image
                src={chain.avatar}
                width="32"
                height="32"
                alt={chain.name}
                className="h-6 w-6 overflow-hidden rounded-full object-cover object-center"
              />
              <p className="sr-only">{chain.name}</p>
            </div>
          ))}
        </div>
        {/* Need more infos on this and about the styling  */}
        <p>{JSON.stringify(token)}</p>
      </div>
    </div>
  );
};
