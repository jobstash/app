import Image from 'next/image';
import { memo } from 'react';

import { cn } from '@jobstash/shared/utils';

interface Props {
  size?: '12' | '16';
  isSpinning?: boolean;
}

const Loader = ({ isSpinning = true, size = '16' }: Props) => (
  <div className={`relative h-${size} w-${size}`}>
    <div
      className={cn('absolute left-0 top-0', { 'animate-spin': isSpinning })}
    >
      <div className={`h-${size} w-${size}`}>
        <Image src="/Logo-01.svg" height={300} width={300} alt="" />
      </div>
    </div>

    <div
      className={cn('absolute left-0 top-0', {
        'animate-reverse-spin': isSpinning,
      })}
    >
      <div className={`h-${size} w-${size}`}>
        <Image src="/Logo-02.svg" height={300} width={300} alt="" />
      </div>
    </div>
  </div>
);

export default memo(Loader);
