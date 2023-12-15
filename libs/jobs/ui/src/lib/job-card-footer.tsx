import { type ReactNode } from 'react';

import { prettyTimestamp } from '@jobstash/shared/utils';

interface Props {
  ts: number;
  shortUUID: string;
  bookmarkButton: ReactNode;
}

const JobCardFooter = ({ ts, shortUUID, bookmarkButton }: Props) => {
  const timestamp = prettyTimestamp(ts);

  return (
    <div className="sm:hidden flex-col gap-4">
      <hr className="border-t border-white/10 h-2" />

      <div className="flex w-full justify-between items-center">
        <span className="text-sm">{timestamp}</span>
        {bookmarkButton}
      </div>
    </div>
  );
};

export default JobCardFooter;
