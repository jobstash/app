import { getTagIcon } from '~/core/constants';
import type { Tag } from '~/core/interfaces';

import { TagButton } from '../unstyled-ui/tag-button';

interface Props {
  tags: Tag[];
}

/** UI for listing tags */
export const TagMapper = ({ tags }: Props) => (
  <div className="flex items-center space-x-2">
    {tags.map(({ text, iconKey }) => (
      <TagButton key={text} text={text} icon={getTagIcon(iconKey)} />
    ))}
  </div>
);
