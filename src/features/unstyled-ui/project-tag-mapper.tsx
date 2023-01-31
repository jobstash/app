import { getTagIcon } from '~/core/constants';
import type { ProjectTags } from '~/core/interfaces';

import { TagButton } from './tag-button';

interface Props {
  tags: ProjectTags['top' | 'bottom'];
}

export const ProjectTagMapper = ({ tags }: Props) => (
  <div className="flex items-center space-x-4">
    {tags.map(({ text, iconKey, link }) => (
      <TagButton
        key={text}
        text={text}
        icon={getTagIcon(iconKey)}
        // eslint-disable-next-line no-alert
        onClick={link ? () => alert('External link') : undefined}
      />
    ))}
  </div>
);
