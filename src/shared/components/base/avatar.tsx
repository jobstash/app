import Image from 'next/image';

import { type VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';

const sizeMap = {
  xs: '24',
  sm: '32',
  md: '40',
  lg: '50',
  xl: '64',
};

type AvatarSizes = keyof typeof sizeMap;

const cvaAvatar = cva([], {
  variants: {
    size: sizeMap,
  },
});

type AvatarVariantProps = VariantProps<typeof cvaAvatar>;

export interface AvatarProps extends AvatarVariantProps {
  src: string;
  alt: string;
  isRounded?: boolean;
}

export const Avatar = ({ src, alt, size = 'md', isRounded }: AvatarProps) => {
  const imageSize = sizeMap[size as AvatarSizes] as `${number}`;

  return (
    <Image
      src={src}
      alt={alt}
      width={imageSize}
      height={imageSize}
      className={clsx({
        'rounded-full': isRounded,
      })}
    />
  );
};
