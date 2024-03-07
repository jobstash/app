import Image from 'next/image';
import Link from 'next/link';

export const Brand = () => {
  return (
    <Link href="/">
      <div
        className="flex items-center justify-center"
        style={{ minHeight: 53 }}
      >
        <Image
          width={120}
          height={32}
          src="/jobstash-nav-brand.png"
          alt=""
          priority
          quality={100}
        />
      </div>
    </Link>
  );
};
