import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import { FRONTEND_URL } from '@jobstash/shared/core';

const Brand = () => (
  <Link scroll={false} href={new URL(FRONTEND_URL)} className="lg:p-4 lg:pl-1">
    <Image
      priority
      src="/JobStash.svg"
      alt="JobStash Logo"
      width="120"
      height="32"
      quality={100}
      className="cursor-pointer"
    />
  </Link>
);

export default memo(Brand);
