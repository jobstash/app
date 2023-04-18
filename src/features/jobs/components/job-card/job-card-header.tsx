import { memo, useMemo } from 'react';

import { BookmarkIcon, Button, Heading } from '~/shared/components';
import { prettyTimestamp } from '~/shared/utils';

interface Props {
  title: string;
  ts: number;
}

const JobCardHeader = ({ title, ts }: Props) => {
  const timestamp = useMemo(() => prettyTimestamp(ts), [ts]);

  return (
    <div className="flex items-center justify-between">
      <Heading size="md" fw="semibold">
        {title}
      </Heading>
      <div className="flex items-center space-x-3">
        <span className="text-sm">{timestamp}</span>
        <div className="z-30">
          <Button size="sm" variant="translucent">
            <BookmarkIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(JobCardHeader);
