import type { Post } from '~/core/interfaces';
import { TagIcon } from '~/shared/components/icons';

const tags = [
  {
    text: 'Website',
    link: '#',
    icon: <TagIcon filename="web" />,
  },
  {
    text: 'Github',
    link: '#',
    icon: <TagIcon filename="github" />,
  },
  {
    text: 'Twitter',
    link: '#',
    icon: <TagIcon filename="twitter" />,
  },
  {
    text: 'LinkedIn',
    link: '#',
    icon: <TagIcon filename="linkedin" />,
  },
  {
    text: 'Discord',
    link: '#',
    icon: <TagIcon filename="discord" />,
  },
];

interface Props {
  org: Post['org'];
}

export const OrgRightPanel = ({ org }: Props) => {
  if (!org) return null;

  const { name, description } = org;

  return (
    <div className="p-6">
      <h2 className="text-xl font-medium">{name}</h2>
      <div className="mt-4 border-t border-white/5 pt-4">
        <p>{description}</p>
      </div>
      <div className="flex space-x-4 pt-8 text-sm">
        {tags.map((tag) => (
          <div key={tag.text} className="flex items-center">
            <div className="relative mr-2 h-3 w-3">{tag.icon}</div>
            <p>{tag.text}</p>
            <p>{tag.link}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
