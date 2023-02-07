import type { Listing } from '~/core/interfaces';
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
  org: Listing['org'];
}

export const OrgRightPanel = ({ org }: Props) => {
  if (!org) return null;

  const { name, description } = org;

  return (
    <div>
      <div>
        <p>{name}</p>
      </div>

      <hr />

      <div>
        <p>{description}</p>
      </div>

      {tags.map((tag) => (
        <div key={tag.text}>
          {tag.icon}
          <p>{tag.text}</p>
          <p>{tag.link}</p>
        </div>
      ))}
    </div>
  );
};
