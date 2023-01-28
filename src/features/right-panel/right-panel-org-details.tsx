import clsx from 'clsx';

import type { Org } from '~/core/interfaces';

interface Props {
  org: Org;
}

const Header = ({ org }: Props) => (
  <>
    <div>
      <h1 className="text-2xl font-bold">{org.name}</h1>
    </div>
    <hr className="h-px border-0 bg-neutral-500" />
  </>
);

const Description = ({ org }: Props) => (
  <div className="max-w-xl">
    <span className="text-xs text-zinc-500">{org.description}</span>
  </div>
);

const tags = [
  {
    text: 'Website',
    link: '#',
  },
  {
    text: 'Github',
    link: '#',
  },
  {
    text: 'Twitter',
    link: '#',
  },
  {
    text: 'LinkedIn',
    link: '#',
  },
  {
    text: 'Discord',
    link: '#',
  },
];

export const RightPanelOrgDetails = ({ org }: Props) => (
  <div className="flex flex-col space-y-6 rounded-2xl border border-zinc-600 p-6">
    <Header org={org} />
    <Description org={org} />
    <div className="flex space-x-6">
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
