import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { Skeleton } from '@nextui-org/skeleton';

import { cn } from '~/shared/utils/cn';
import { getGradientBorderStyle } from '~/shared/utils/get-gradient-border-style';

interface TabProps {
  text: string;
  href: string;
  isActive?: boolean;
}

export const DetailsPanelTab = ({ href, isActive, text }: TabProps) => {
  const linkStyle = isActive ? getGradientBorderStyle() : undefined;

  const wrapperClassName = cn(
    SHARED_CLASSNAME,
    'flex items-center justify-center border border-white/20 px-4 py-2',
  );

  const contentClassName = cn(
    `rounded-lg border border-transparent font-lato text-sm`,
    {
      'border-0': isActive, // Prevent active border layout shift
    },
  );

  return (
    <Button
      as={Link}
      href={href}
      data-active={isActive}
      className={wrapperClassName}
      style={linkStyle}
    >
      <span className={contentClassName}>{text}</span>
    </Button>
  );
};

const SHARED_CLASSNAME = 'h-10 shrink-0 rounded-lg sm:h-12 md:h-8';

export const DetailsPanelTabSkeleton = () => {
  return <Skeleton className={cn(SHARED_CLASSNAME, 'w-28')} />;
};
