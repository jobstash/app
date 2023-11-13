import Image from 'next/image';
import { memo } from 'react';

const NavBrand = () => (
  <div className="w-1/3 md:w-1/4">
    <Image priority width="202" height="32" src="/logo.png" alt="Job Stash" />
  </div>
);

export default memo(NavBrand);
