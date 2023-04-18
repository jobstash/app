import Image from 'next/image';
import { memo } from 'react';

import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const avatar = cva(['relative rounded-xl object-cover overflow-hidden'], {
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-[55px] w-[55px]',
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
  <div className={clsx(avatar({ size }), { 'rounded-full': isRounded })}>
    <Image fill src={src} alt={alt} />
  </div>
);

export default memo(Avatar);
