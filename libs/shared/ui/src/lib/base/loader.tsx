import Image from 'next/image';
import { memo } from 'react';

import { cn } from '@jobstash/shared/utils';

interface Props {
  isSpinning?: boolean;
}

const Loader = ({ isSpinning = true }: Props) => (
  <div className="relative h-16 w-16">
    <div
      className={cn('absolute left-0 top-0', { 'animate-spin': isSpinning })}
    >
      <div className="h-16 w-16">
        <Image src="/Logo-01.svg" height={300} width={300} alt="" />
      </div>
    </div>

    <div
      className={cn('absolute left-0 top-0', {
        'animate-reverse-spin': isSpinning,
      })}
    >
      <div className="h-16 w-16">
        <Image src="/Logo-02.svg" height={300} width={300} alt="" />
      </div>
    </div>
  </div>
);

export default memo(Loader);
