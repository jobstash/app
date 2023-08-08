import { memo } from 'react';

import { prettyTimestamp } from '@jobstash/shared/utils';

import { Heading } from '@jobstash/shared/ui';

interface Props {
  title: string;
  timestamp: number;
}

const RepoCardHeader = (props: Props) => {
  const { title, timestamp } = props;

  const ts = prettyTimestamp(timestamp);

  return (
    <div className="items-center justify-between space-y-2 lg:flex lg:space-y-0">
      <Heading size="md" fw="semibold">
        {title}
      </Heading>
      <hr className="flex border-t border-white/10 lg:hidden" />
      <div className="hidden items-center space-x-3 lg:flex">
        <span className="text-sm">{ts}</span>
      </div>
    </div>
  );
};

export default memo(RepoCardHeader);
