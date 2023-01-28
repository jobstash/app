import Image from 'next/image';

import clsx from 'clsx';

import type { Org } from '~/core/interfaces';

interface Props {
  org: Org;
}

export const RightPanelHeader = ({
  org: { name, avatar, location, teamSize, fundingDate, summary, tags },
}: Props) => (
  <div className="space-y-4 py-12">
    <div className="flex items-center space-x-4">
      <Image src={avatar} width="40" height="40" alt="test" />
      <h1 className="text-2xl font-bold">{name}</h1>
    </div>
    <div className="flex space-x-4">
      <span className="text-sm">{location}</span>
      <span className="text-sm">Team Size: {teamSize}</span>
      <span className="text-sm">Funding: {fundingDate}</span>
    </div>
    <div className="max-w-xl">
      <span className="text-sm text-zinc-500">{summary}</span>
    </div>
    <div className="flex space-x-4 py-2">
      {tags.map((tag) => (
        <div
          key={tag.text}
          className={clsx(
            'rounded-md border border-zinc-500 bg-zinc-700 px-1',
            { 'cursor-pointer': Boolean(tag.link) },
          )}
          // eslint-disable-next-line no-alert
          onClick={tag.link ? () => alert('External link') : undefined}
        >
          <span className="text-xs">{tag.text}</span>
        </div>
      ))}
    </div>
  </div>
);
