import Image from 'next/image';

import { cn } from '~/shared/utils/cn';

import { Heading } from './heading';
import { Text } from './text';

interface Props {
  action: React.ReactNode;
  textProps: {
    heading: string;
    message: string;
  };
  imgProps: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  classNames?: {
    image: string;
  };
  isTransparent?: boolean;
}

export const ErrorAction = ({
  action,
  textProps,
  imgProps,
  classNames,
  isTransparent,
}: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-8 rounded-3xl bg-white/5 p-12',
        { 'bg-transparent': isTransparent },
      )}
    >
      <Image
        priority
        src={imgProps.src}
        quality={100}
        alt={imgProps.alt ?? textProps.heading}
        width={imgProps.width ?? DEFAULT_IMAGE_DIMENSION}
        height={imgProps.height ?? DEFAULT_IMAGE_DIMENSION}
        className={classNames?.image}
      />

      <div className="flex flex-col items-center gap-y-2">
        <Heading text={textProps.heading} className="text-3xl" />
        <div className="flex max-w-sm flex-col gap-2 text-center">
          <Text text={textProps.message} className="text-base" />
        </div>
      </div>

      {action}
    </div>
  );
};

const DEFAULT_IMAGE_DIMENSION = 300;
