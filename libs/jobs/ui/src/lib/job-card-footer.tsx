import { prettyTimestamp } from '@jobstash/shared/utils';

import { BookmarkButton } from '@jobstash/shared/ui';

interface Props {
  ts: number;
  isBookmarked: boolean;
}

const JobCardFooter = ({ ts, isBookmarked }: Props) => {
  const timestamp = prettyTimestamp(ts);

  return (
    <div className="sm:hidden flex-col gap-4">
      <hr className="border-t border-white/10 h-2" />

      <div className="flex w-full justify-between items-center">
        <span className="text-sm">{timestamp}</span>
        <BookmarkButton isBookmarked={isBookmarked} />
      </div>
    </div>
  );
};

export default JobCardFooter;
