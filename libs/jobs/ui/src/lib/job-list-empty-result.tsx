import Image from 'next/image';
import { type NextRouter } from 'next/router';
import { memo, useCallback } from 'react';

import { Button, Heading, Text } from '@jobstash/shared/ui';

interface Props {
  prevLink: string | null;
  push: NextRouter['push'];
}

const JobListEmptyResult = ({ prevLink, push }: Props) => {
  const onClick = useCallback(() => {
    const url = prevLink ?? '/jobs';
    push(url, undefined, { shallow: true });
  }, [prevLink, push]);

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
          Nothing Here...
        </Heading>
        <div className="max-w-xs text-center">
          <Text color="dimmed">
            Your search criteria is too restrictive and yielded no results.
          </Text>
        </div>
      </div>

      <div>
        <Button
          variant="primary"
          textProps={{ fw: 'semibold' }}
          size="md"
          onClick={onClick}
        >
          Back to Previous Results
        </Button>
      </div>
    </div>
  );
};

export default memo(JobListEmptyResult);
