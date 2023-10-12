import { memo } from 'react';

import { prettyTimestamp } from '@jobstash/shared/utils';

import { Heading } from '@jobstash/shared/ui';

interface Props {
  title: string;
  ts: number;
}

const JobCardHeader = ({ title, ts }: Props) => {
  const timestamp = prettyTimestamp(ts);

  return (
    <div className="sm:flex items-center justify-between">
      <Heading size="md" fw="semibold">
        {title}
      </Heading>
      <hr className="border-t border-white/10 hidden sm:flex" />
      <div className="hidden items-center sm:flex h-full min-w-fit">
        <span className="text-sm">{timestamp}</span>
      </div>
    </div>
  );
};

export default memo(JobCardHeader);
