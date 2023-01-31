import { getTagIcon } from '~/core/constants';
import type { Tag } from '~/core/interfaces';

import { TagButton } from '../unstyled-ui/tag-button';
import { TagMapper } from '../unstyled-ui/tag-mapper';

interface Props {
  tags: Tag[];
}

/** UI for listing tags (returns tag-mapper for now) */
export const ListingTags = ({ tags }: Props) => <TagMapper tags={tags} />;
