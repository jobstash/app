import { memo } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@jobstash/shared/utils';

import { type AvatarProps, default as Avatar } from './avatar';
import Heading from './heading';
import Text from './text';

const logoTitle = cva([], {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
});

type LogoTitleVariantProps = VariantProps<typeof logoTitle>;

interface LogoTitleProps extends LogoTitleVariantProps {
  title: string;
  avatarProps: AvatarProps;
  location?: string;
  hasMinWidth?: boolean;
}

const LogoTitle = ({
  title,
  avatarProps: { src, alt, isRounded },
  size = 'md',
  location,
  hasMinWidth,
}: LogoTitleProps) => (
  <div
    className={cn('flex w-fit items-center gap-x-3', {
      'min-w-[148px]': hasMinWidth,
    })}
  >
    <Avatar src={src} alt={alt} size={size} isRounded={isRounded} />
    <div className="flex flex-col justify-center gap-1">
      <Heading size={size === 'lg' ? 'md' : 'sm'}>{title}</Heading>
      {location && (
        <Text size="sm" color="dimmed">
          {location}
        </Text>
      )}
    </div>
  </div>
);

export default memo(LogoTitle);
