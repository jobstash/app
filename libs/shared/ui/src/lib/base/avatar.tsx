import Image from 'next/image';
import { forwardRef, memo } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@jobstash/shared/utils';

const avatar = cva(['relative rounded-xl object-cover overflow-hidden'], {
  variants: {
    size: {
      '2xs': 'h-6 w-6 min-w-[26px] min-h-[26px]',
      xs: 'h-7 w-7 min-w-[28px] min-h-[28px]',
      sm: 'h-8 w-8 min-w-[32px] min-h-[32px]',
      md: 'h-10 w-10 min-w-[40px] min-h-[40px]',
      lg: 'h-[55px] w-[55px] min-w-[55px] min-h-[55px]',
    },
  },
});

type AvatarVariantProps = VariantProps<typeof avatar>;

export interface AvatarProps extends AvatarVariantProps {
  src: string;
  alt: string;
  isRounded?: boolean;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, size, isRounded }, ref) => (
    <div
      ref={ref}
      className={cn(avatar({ size }), { 'rounded-full': isRounded })}
    >
      <Image fill src={src} alt={alt} />
    </div>
  ),
);
Avatar.displayName = 'Avatar';

export default memo(Avatar);
