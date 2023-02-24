import Image from 'next/image';

import { Text } from './text';

export interface ChainHeadingProps {
  children: string;
  avatar: string;
  alt: string;
  location?: string;
  iconSize?: '32' | '40';
}

export const ChainHeading = ({
  children,
  avatar,
  alt,
  location,
  iconSize = '32',
}: ChainHeadingProps) => (
  <div className="flex items-center">
    <Image
      src={avatar}
      width={iconSize}
      height={iconSize}
      alt={alt}
      className="mr-3"
    />
    <div className="leading-tight">
      <Text
        fw="semibold"
        size="lg"
        htmlTag="h3"
        color="white"
        className="mr-8 font-sans"
      >
        {children}
      </Text>
      <span className="text-sm">{location}</span>
    </div>
  </div>
);
