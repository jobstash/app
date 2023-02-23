import Image from 'next/image';

import { Text } from './text';

export interface ChainHeadingProps {
  children: string;
  avatar: string;
  alt: string;
}

export const ChainHeading = ({ children, avatar, alt }: ChainHeadingProps) => (
  <div className="flex items-center">
    <Image src={avatar} width="32" height="32" alt={alt} className="mr-3" />
    <Text
      fw="semibold"
      size="lg"
      htmlTag="h3"
      color="white"
      className="mr-8 font-sans"
    >
      {children}
    </Text>
  </div>
);
