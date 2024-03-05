import Image from 'next/image';
import { memo, useEffect, useState } from 'react';

import { Avatar as NextUIAvatar, Skeleton } from '@nextui-org/react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn, getLogoUrlHttpsAlternative } from '@jobstash/shared/utils';

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

const Avatar = ({ src, alt, size, isRounded }: AvatarProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const [isFallback, setIsFallback] = useState(false);
  const [isFinal, setIsFinal] = useState(false);

  const showFallback = () => setIsFallback(true);

  useEffect(() => {
    if (isFallback && !isFinal) {
      setImgSrc(getLogoUrlHttpsAlternative(src));
      setIsFallback(false);
      setIsFinal(true);
    }
  }, [isFallback, isFinal, src]);

  if (isFallback) {
    return <FallbackImage />;
  }

  return (
    <div className={cn(avatar({ size }), { 'rounded-full': isRounded })}>
      <Image
        key={imgSrc}
        fill
        src={imgSrc}
        alt={alt}
        onError={() => {
          showFallback();
        }}
      />
    </div>
  );
};

export default memo(Avatar);

const FallbackImage = () => (
  <NextUIAvatar
    showFallback
    radius="lg"
    src=""
    fallback={<Skeleton className="rounded-sm w-12 h-12" />}
  />
);
