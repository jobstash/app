import { memo, useMemo } from 'react';

import { Button, HamburgerIcon, Heading } from '~/shared/components';
import { prettyTimestamp } from '~/shared/utils';

interface Props {
  title: string;
  ts: number;
}

const JobCardHeader = ({ title, ts }: Props) => {
  const timestamp = useMemo(() => prettyTimestamp(ts), [ts]);

  return (
    <div className="items-center justify-between space-y-2 lg:flex lg:space-y-0">
      <Heading size="md" fw="semibold">
        {title}
      </Heading>
      <hr className="flex border-t border-white/10 lg:hidden" />
      <div className="hidden items-center space-x-3 lg:flex">
        <span className="text-sm">{timestamp}</span>
        {/* <div className="z-30">
          <Button size="sm" variant="translucent">
            <HamburgerIcon />
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default memo(JobCardHeader);
