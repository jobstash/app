import Image from 'next/image';

import { getTagIcon } from '~/core/constants';
import type { Project } from '~/core/interfaces';

import { Button } from '../unstyled-ui/base/button';
import { LogoTitle } from '../unstyled-ui/logo-title';

interface Props {
  project: Project;
}

const ProjectName = ({ project }: Props) => (
  <LogoTitle
    name={project.name}
    avatar={project.avatar}
    size="lg"
    avatarSize="sm"
  />
);

const ProjectChains = ({ project }: Props) => {
  let { chains } = project;
  if (chains.length > 6) chains = chains.slice(0, 6);

  return (
    <div className="flex items-center">
      {chains.map((chain) => (
        <div key={chain.name} className="-ml-2">
          <Image
            src={`/chains/${chain.name}.svg`}
            width="26"
            height="26"
            alt={chain.name}
          />
        </div>
      ))}
    </div>
  );
};

const ProjectHeaderTags = ({ project }: Props) => (
  <div className="flex items-center space-x-4">
    {project.tags.top.slice(0, 2).map((tag) => (
      <Button
        key={tag.text}
        size="sm"
        kind={tag.link ? undefined : 'subtle'}
        textProps={{ fw: 'regular' }}
        left={getTagIcon(tag.iconKey)}
      >
        {tag.text}
      </Button>
    ))}
  </div>
);

export const ProjectTags = ({ project }: Props) => {
  const tags = [...project.tags.top, ...project.tags.bottom];

  return (
    <div className="flex items-center space-x-4">
      {tags.slice(1, tags.length).map((tag) => (
        <Button
          key={tag.text}
          kind={tag.link ? undefined : 'subtle'}
          size="sm"
          textProps={{ fw: 'regular' }}
          left={getTagIcon(tag.iconKey)}
        >
          {tag.text}
        </Button>
      ))}
    </div>
  );
};

/** Returns null if project was not provided */
export const JobListingProject = ({ project }: Props) => (
  <>
    <hr className="h-px border-0 bg-neutral-600" />

    <div className="flex flex-col space-y-3 py-4">
      <div className="flex items-center space-x-8">
        <ProjectName project={project} />
        <ProjectChains project={project} />
        <ProjectHeaderTags project={project} />
      </div>

      <ProjectTags project={project} />
    </div>
    <div />
  </>
);
