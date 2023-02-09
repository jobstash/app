import type { MouseEventHandler } from 'react';

import type { OrgPost } from '~/core/interfaces';
import { Button } from '~/shared/components';

import { createOrgTags } from '../utils';

interface Props {
  post: OrgPost;
  isActive: boolean;
  onClick: MouseEventHandler;
}

// *** UNSTYLED ***
export const OrgCard = ({ post, isActive, onClick }: Props) => {
  const { details, created } = post;

  const { name, avatar, location, techs } = details;
  const tags = createOrgTags(post);

  return (
    <div onClick={onClick}>
      <div>
        <div>
          <p>{name}</p>
          <p>{location}</p>
          <p>{avatar}</p>
        </div>

        <div>
          <p>{created}</p>
          <Button>bookmark</Button>
        </div>
      </div>
      <hr />

      <div>
        {tags.map((tag) => (
          <div key={tag.text}>
            {tag.icon}
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>

      <hr />
      <div>
        {techs.map((tech) => (
          <div key={tech.name}>
            <p>{tech.name}</p>
            <p>{tech.isChecked}</p>
          </div>
        ))}
        <Button>Sign Up to See Matches</Button>
      </div>
    </div>
  );
};
