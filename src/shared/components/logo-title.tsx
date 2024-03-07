import Image from 'next/image';

import { Skeleton } from '@nextui-org/skeleton';

interface Props {
  src: string;
  name?: string;
  children?: React.ReactNode;
}

export const LogoTitle = ({ src, name, children }: Props) => {
  let content = children ?? null;

  if (name && !content) {
    content = <h3 className={`font-lato font-bold`}>{name}</h3>;
  }

  return (
    <div className={CONTAINER_CLASSNAME}>
      <div className="relative h-10 min-h-[40px] w-10 min-w-[40px] overflow-hidden rounded-full object-cover">
        <Image fill src={src} alt={name ?? ''} sizes="(max-width: 64px)" />
      </div>
      {content}
    </div>
  );
};

const CONTAINER_CLASSNAME = 'flex items-center gap-3';

export const LogoTitleSkeleton = () => (
  <div className={CONTAINER_CLASSNAME}>
    <Skeleton className="flex h-10 w-10 rounded-full" />
    <Skeleton className="h-4 w-24 rounded-md" />
  </div>
);
