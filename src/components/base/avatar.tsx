import Image from 'next/image';

import { type VariantProps, cva } from 'class-variance-authority';

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
type RequiredVariantProps = Required<Pick<AvatarVariantProps, 'size'>>;

export interface AvatarProps extends RequiredVariantProps {
  src: string;
  alt: string;
}

export const Avatar = ({ src, alt, size = 'md' }: AvatarProps) => {
  const imageSize = sizeMap[size as AvatarSizes] as `${number}`;

  return <Image src={src} alt={alt} width={imageSize} height={imageSize} className="rounded-full" />;
};
