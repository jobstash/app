import Image from 'next/image';

import clsx from 'clsx';

import type { Project } from '~/core/interfaces';

/** After undefined guard, we know project exists */

interface Props {
  project: Project;
}

const ProjectName = ({ project }: Props) => (
  <div className="flex items-center space-x-4">
    <Image src={project.avatar} width="40" height="40" alt="test" />
    <h2 className="text-lg font-bold">{project.name}</h2>
  </div>
);

const ProjectChains = ({ project }: Props) => (
  <div className="flex items-center">
    {project.chains.map((chain) => (
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

const ProjectHeaderTags = ({ project }: Props) => {
  const tags = [...project.tags.top, ...project.tags.bottom];

  return (
    <div className="flex items-center space-x-4">
      {tags.slice(0, 2).map((tag) => (
        <div
          key={tag.text}
          className={clsx(
            'rounded-sm border border-zinc-500 bg-zinc-700 px-1',
            {
              'cursor-pointer': Boolean(tag.link),
            },
          )}
          // eslint-disable-next-line no-alert
          onClick={tag.link ? () => alert('External link') : undefined}
        >
          <span className="text-xs text-zinc-300">{tag.text}</span>
        </div>
      ))}
    </div>
  );
};

export const ProjectTags = ({ project }: Props) => {
  const tags = [...project.tags.top, ...project.tags.bottom];

  return (
    <div className="flex items-center space-x-4">
      {tags.slice(2, -1).map((tag) => (
        <div
          key={tag.text}
          className={clsx('rounded-sm px-1', {
            'cursor-pointer': Boolean(tag.link),
          })}
          // eslint-disable-next-line no-alert
          onClick={tag.link ? () => alert('External link') : undefined}
        >
          <span className="text-xs text-zinc-300">{tag.text}</span>
        </div>
      ))}
    </div>
  );
};

/** Returns null if project was not provided */
export const JobListingProject = ({ project }: Props) => (
  <>
    <hr className="h-px border-0 bg-neutral-600" />

    <div className="flex flex-col space-y-6">
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
