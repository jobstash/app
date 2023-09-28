import Image from 'next/image';
import { memo } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@jobstash/shared/utils';

const avatar = cva(['relative rounded-xl object-cover overflow-hidden'], {
  variants: {
    size: {
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

const Avatar = ({ src, alt, size, isRounded }: AvatarProps) => (
  <div className={cn(avatar({ size }), { 'rounded-full': isRounded })}>
    <Image fill src={src} alt={alt} />
  </div>
);

export default memo(Avatar);
