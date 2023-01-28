import Image from 'next/image';

import clsx from 'clsx';

import type { Project } from '~/core/interfaces';

interface Props {
  project: Project;
}

const TEXT_TECHNOLOGIES_DESC =
  'Uncover the technical skills and tools employed by the company, and gain insight into the technologies that dive their success.';

export const RightPanelProjectDetails = ({ project }: Props) => (
  <div className="flex flex-col space-y-6 rounded-2xl border border-zinc-600 p-6">
    <div className="flex items-center space-x-4">
      <Image src={project.avatar} width="48" height="48" alt="test" />
      <h1 className="text-2xl font-bold">{project.name}</h1>
    </div>

    <hr className="h-px border-0 bg-zinc-700" />

    <div className="flex flex-col space-y-4">
      <h2 className="font-bold">Description</h2>
      <div className="max-w-xl">
        <span className="text-sm text-zinc-500">{project.description}</span>
      </div>
    </div>

    <hr className="h-px border-0 bg-zinc-700" />

    <div className="flex items-center space-x-4">
      {project.tags.top.map((tag) => (
        <div
          key={tag.text}
          className={clsx(
            'rounded-md border border-zinc-500 bg-zinc-700 px-1',
            { 'cursor-pointer': Boolean(tag.link) },
          )}
          // eslint-disable-next-line no-alert
          onClick={tag.link ? () => alert('External link') : undefined}
        >
          <span className="text-xs text-zinc-300">{tag.text}</span>
        </div>
      ))}
    </div>

    <hr className="h-px border-0 bg-zinc-700" />

    <div className="flex items-center space-x-4">
      {project.tags.bottom.map((tag) => (
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

    <hr className="h-px border-0 bg-zinc-700" />

    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <h3 className="text-sm">Chains:</h3>
        <div className="flex items-center space-x-2">
          {project.chains.map((chain) => (
            <div key={chain.name}>
              <Image
                src={`/chains/${chain.name}.svg`}
                width="26"
                height="26"
                alt={chain.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    <hr className="h-px border-0 bg-zinc-700" />

    <div className="flex flex-col space-y-4">
      <h2 className="font-bold">Technologies</h2>
      <div className="max-w-xl">
        <span className="text-sm text-zinc-500">{TEXT_TECHNOLOGIES_DESC}</span>
      </div>
      <div className="flex space-x-4">
        {project.skills.map((skill) => (
          <div
            key={skill.name}
            className={clsx('border border-zinc-500 py-2 px-4', {
              'border-red-700': skill.isChecked,
            })}
          >
            <h3 className="text-xs">{skill.name}</h3>
          </div>
        ))}
      </div>
    </div>
  </div>
);
