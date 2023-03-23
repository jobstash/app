import Image from 'next/image';

export const Brand = () => (
  <Image
    priority
    src="/JobStash.png"
    alt="JobStash Logo"
    width="120"
    height="32"
    quality={100}
  />
);
