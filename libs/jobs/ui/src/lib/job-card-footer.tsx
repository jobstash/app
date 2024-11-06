import { type ReactNode } from 'react';

import { cn } from '@jobstash/shared/utils';

interface Props {
  isFeatured: boolean;
  timestampText: string;
  topRightAction: ReactNode;
}

const JobCardFooter = ({
  timestampText,
  isFeatured,
  topRightAction,
}: Props) => (
  <div className="sm:hidden flex-col gap-4">
    <hr className="border-t border-white/10 h-2" />

    <div className="flex w-full justify-between items-center pt-2">
      <span
        className={cn('text-sm', {
          'font-bold text-white': isFeatured,
        })}
      >
        {timestampText}
      </span>

      {topRightAction}
    </div>
  </div>
);

export default JobCardFooter;
