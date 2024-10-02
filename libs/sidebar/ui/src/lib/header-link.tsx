import Link from 'next/link';
import { memo } from 'react';

import { Text } from '@jobstash/shared/ui';

interface Props {
  text: string;
  link: string;
  isMobile?: boolean;
}

const HeaderLink = ({ text, link, isMobile }: Props) => {
  const textClassName = isMobile ? 'font-medium' : 'text-md whitespace-nowrap';
  return (
    <Link target="_blank" href={link} rel="noopener noreferrer">
      <Text className={textClassName}>{text}</Text>
    </Link>
  );
};

export default memo(HeaderLink);
