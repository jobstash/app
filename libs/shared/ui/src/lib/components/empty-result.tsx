import Image from 'next/image';
import { memo, type ReactNode } from 'react';

import { Text } from '@mantine/core';

import Heading from '../base/heading';

interface Props {
  title?: string;
  description: string;
  actionSection?: ReactNode;
}

const EmptyResult = (props: Props) => {
  const { title = 'Nothing Here ...', description, actionSection } = props;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 rounded-3xl bg-white/5 p-8">
      <div className="pt-16">
        <Image
          priority
          src="/empty-result.png"
          quality={100}
          alt="Empty result"
          width={418}
          height={297}
        />
      </div>

      <div className="flex flex-col items-center gap-y-2">
        <Heading size="xl" fw="semibold">
          {title}
        </Heading>
        <div className="max-w-xs text-center">
          <Text color="dimmed">{description}</Text>
        </div>
      </div>

      {actionSection ?? null}
    </div>
  );
};

export default memo(EmptyResult);
