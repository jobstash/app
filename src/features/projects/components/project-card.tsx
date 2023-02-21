import Image from 'next/image';
import type { MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import type { ProjectPost } from '~/core/interfaces';
import { Button } from '~/shared/components';

import { createProjectTags } from '../utils';

const cvaProjectCard = cva(
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
        <h2 className="text-xl font-medium">{name}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm">{created}</span>
          <Button>bookmark</Button>
        </div>
      </div>
      <div className="flex flex-wrap border-b border-white/5 pb-4 text-sm">
        {[...top, ...mid].map((tag) => (
          <div key={tag.text} className="mb-2 mr-4 flex items-center">
            <div className="relative mr-2 h-3 w-3">{tag.icon}</div>
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap border-b border-white/5 pb-4 text-sm">
        {[...bottom].map((tag) => (
          <div key={tag.text} className="mb-2 mr-4 flex items-center">
            <div className="relative mr-2 h-3 w-3">{tag.icon}</div>
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>

      <div className="flex space-x-4 border-b border-white/5 pb-4">
        {techs.map((tech) => (
          <div
            key={tech.name}
            className="relative flex self-start rounded-sm border border-white	p-1"
          >
            <span className="text-sm font-semibold">{tech.name}</span>
            <div className="absolute right-0 top-0 -mt-2 -mr-2 h-4 w-4 rounded-full bg-white">
              {tech.isChecked}
            </div>
          </div>
        ))}
        <Button>Sign Up to See Matches</Button>
      </div>

      <div className="flex space-x-4 border-b border-white/5 pb-4">
        <div className="flex items-center space-x-4">
          <Image src={avatar} width="40" height="40" alt={name} />
          <p>{name}</p>
        </div>
        {chains.map((chain) => (
          <div key={chain.name}>
            <Image src={chain.avatar} width="40" height="40" alt={chain.name} />
            {/* <p>{chain.name}</p> */}
          </div>
        ))}
        <p>{JSON.stringify(token)}</p>
      </div>
    </div>
  );
};
