import Image from 'next/image';
import { memo } from 'react';

const Brand = () => (
  <Image
    priority
    src="/JobStash.svg"
    alt="JobStash Logo"
    width="120"
    height="32"
    quality={100}
    className="cursor-pointer"
  />
);

export default memo(Brand);
