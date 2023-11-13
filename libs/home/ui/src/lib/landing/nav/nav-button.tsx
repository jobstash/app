import { memo } from 'react';

import { cn } from '@jobstash/shared/utils';

interface Props {
  text: string;
  isTransparent?: boolean;
  href: string;
}

const NavButton = (props: Props) => {
  const { href, text, isTransparent = false } = props;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-block items-center space-x-1 rounded-lg py-2.5 px-6 text-sm font-bold text-white md:text-sm',
        { 'bg-gradient-to-l from-primary to-secondary': !isTransparent },
        'transition duration-150 ease-in-out',
        'hover:opacity-90 focus:opacity-90 active:scale-[.95] active:opacity-75',
      )}
    >
      <span className="text-md">{text}</span>
    </a>
  );
};

export default memo(NavButton);
