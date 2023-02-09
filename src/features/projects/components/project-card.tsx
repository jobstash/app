import type { MouseEventHandler } from 'react';

import type { ProjectPost } from '~/core/interfaces';
import { Button } from '~/shared/components';

import { createProjectTags } from '../utils';

interface Props {
  post: ProjectPost;
  isActive: boolean;
  onClick: MouseEventHandler;
}

// *** UNSTYLED ***
export const ProjectCard = ({ post, isActive, onClick }: Props) => {
  const { details, created } = post;

  const { name, avatar, techs, chains, token } = details;

  const { top, mid, bottom } = createProjectTags(details);

  return (
    <div onClick={onClick}>
      <div>
        <p>{name}</p>
        <div>
          <p>{created}</p>
          <Button>bookmark</Button>
        </div>
      </div>

      {[...top, ...mid].map((tag) => (
        <div key={tag.text}>
          {tag.icon}
          <p>{tag.text}</p>
          <p>{tag.link}</p>
        </div>
      ))}

      <hr />

      {[...bottom].map((tag) => (
        <div key={tag.text}>
          {tag.icon}
          <p>{tag.text}</p>
          <p>{tag.link}</p>
        </div>
      ))}

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

      <hr />

      <div>
        <div>
          <p>{name}</p>
          <p>{avatar}</p>
        </div>
        {chains.map((chain) => (
          <div key={chain.name}>
            <p>{chain.name}</p>
            <p>{chain.avatar}</p>
          </div>
        ))}
        <p>{JSON.stringify(token)}</p>
      </div>
    </div>
  );
};
