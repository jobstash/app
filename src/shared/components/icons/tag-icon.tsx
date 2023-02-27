import Image from 'next/image';

import type { TagIconFilename } from '~/shared/core/types';

interface Props {
  filename: TagIconFilename;
}

export const TagIcon = ({ filename }: Props) => (
  <Image
    src={`/icons/tags/${filename}.svg`}
    alt={filename}
    width="13"
    height="13"
    className="mr-1"
  />
);
