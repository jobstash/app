import Image from 'next/image';
import type { MouseEventHandler } from 'react';

import { cva } from 'class-variance-authority';

import type { OrgPost } from '~/core/interfaces';
import { Button } from '~/shared/components';

import { createOrgTags } from '../utils';


const cvaOrgCard = cva(
  [
    'w-full overflow-hidden rounded-3xl bg-white/5 p-5 text-ivory cursor-pointer',
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
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Image
            src={avatar}
            width="40"
            height="40"
            alt={name}
          />
          <div className='leading-tight'>
            <h2 className='text-lg font-medium'>{name}</h2>
            <span className='text-sm'>{location}</span>
          </div>
        </div>

        <div className='flex items-center space-x-2'>
          <span className='text-sm'>{created}</span>
          <Button>bookmark</Button>
        </div>
      </div>

      <div className='mt-4 flex flex-wrap border-t border-white/5 pt-4 pb-2 text-sm'>
        {tags.map((tag) => (
          <div key={tag.text} className='mr-4 mb-2 flex items-center'>
            <div className='pr-2'>{tag.icon}</div>
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>
      <div className='flex space-x-4 border-t border-white/5 pt-4'>
        {techs.map((tech) => (
          <div key={tech.name} className='relative flex self-start rounded-sm border border-white	p-1'>
            <span className='text-sm font-semibold'>{tech.name}</span>
            <div className='absolute right-0 top-0 -mt-2 -mr-2 h-4 w-4 rounded-full bg-white'>{tech.isChecked}</div>
          </div>
        ))}
        <Button>Sign Up to See Matches</Button>
      </div>
    </div>
  );
};
