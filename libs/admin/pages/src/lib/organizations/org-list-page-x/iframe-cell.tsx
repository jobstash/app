import { memo } from 'react';

interface Props {
  index: number;
  website: string[];
}

export const IFrameCell = memo(({ website, index }: Props) => {
  if (index >= website.length) return null;

  const url = website[index];

  const src = url.startsWith('http') ? url : `https://${url}`;

  return (
    <iframe
      is="x-frame-bypass"
      sandbox="allow-popups"
      src={src}
      title={url}
      width="100%"
      height="100%"
    />
  );
});

IFrameCell.displayName = 'IFrameCell';
