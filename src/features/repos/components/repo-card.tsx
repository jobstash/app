import type { MouseEventHandler } from 'react';

import type { RepoPost } from '~/core/interfaces';
import { Button } from '~/shared/components';

import { createRepoTags, getRepoTechs } from '../utils';

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
    <div onClick={onClick}>
      <div>
        <p>{name}</p>
        <div>
          <p>{created}</p>
          <Button>bookmark</Button>
        </div>
      </div>

      <div>
        <h3>{description}</h3>
      </div>

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

      {techs.map((tech) => (
        <div key={tech.name}>
          <p>{tech.name}</p>
          <p>{tech.isChecked}</p>
        </div>
      ))}

      <hr />

      <div>
        <p>{org.name}</p>
        <p>{org.avatar}</p>
      </div>
    </div>
  );
};
