import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';

import { cn } from '@jobstash/shared/utils';

import { Text } from '@jobstash/shared/ui';

interface Props {
  text: string;
  link: string;
  isMobile?: boolean;
  isExternal?: boolean;
}

const HeaderLink = ({ text, link, isMobile, isExternal }: Props) => {
  const { pathname } = useRouter();
  const isActive = link === pathname;

  const target = isExternal ? '_blank' : '_self';
  const textClassName = isMobile ? 'font-medium' : 'text-md whitespace-nowrap';

  return (
    <Link target={target} href={link} rel="noopener noreferrer">
      <Text className={cn(textClassName, { 'font-black': isActive })}>
        {text}
      </Text>
    </Link>
  );
};

export default memo(HeaderLink);
