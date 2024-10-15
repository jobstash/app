import { memo, type ReactNode } from 'react';

import { featuredButtonStyle } from '@jobstash/shared/core';
import { cn } from '@jobstash/shared/utils';

import { Heading, Text } from '@jobstash/shared/ui';

interface Props {
  title: string;
  timestampText: string;
  isFeatured: boolean;
  bookmarkButton: ReactNode;
}

const JobCardHeader = ({
  title,
  timestampText,
  isFeatured,
  bookmarkButton,
}: Props) => (
  <div className="sm:flex items-center justify-between">
    {isFeatured ? (
      <div style={featuredButtonStyle}>
        <Text size="sm" fw="bold">
          Featured
        </Text>
      </div>
    ) : (
      <Heading size="md" fw="semibold">
        {title}
      </Heading>
    )}
    <hr className="border-t border-white/10 hidden sm:flex" />
    <div className="hidden items-center sm:flex h-full min-w-fit gap-4">
      <span
        className={cn('text-sm', {
          'font-bold text-white': isFeatured,
        })}
      >
        {timestampText}
      </span>

      {bookmarkButton}
    </div>
  </div>
);

export default memo(JobCardHeader);
