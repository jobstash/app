import Image from 'next/image';
import type { MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import type { RepoPost } from '~/core/interfaces';
import { Button } from '~/shared/components';

import { createRepoTags, getRepoTechs } from '../utils';

const cvaRepoCard = cva(
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
  post: RepoPost;
  isActive: boolean;
  onClick: MouseEventHandler;
}

export const RepoCard = ({ post, isActive, onClick }: Props) => {
  const { details, created, org } = post;

  const { name, description } = details;

  const tags = createRepoTags(details);
  const techs = getRepoTechs(details);

  return (
    <div className={cvaRepoCard({ isActive })} onClick={onClick}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">{name}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm">{created}</span>
          <Button>bookmark</Button>
        </div>
      </div>
      <p className="text-sm">{description}</p>
      <div className="flex space-x-8 border-b border-white/5 pb-4 text-sm">
        {tags.map((tag) => (
          <div key={tag.text} className="flex items-center">
            <div className="relative mr-2 h-3 w-3">{tag.icon}</div>
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
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
      </div>

      <div className="flex items-center space-x-4 border-t border-white/5 pt-4">
        <Image src={org.avatar} width="32" height="32" alt={org.name} />
        <h3 className="font-semibold">{org.name}</h3>
      </div>
    </div>
  );
};
