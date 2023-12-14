import { memo } from 'react';

import { prettyTimestamp } from '@jobstash/shared/utils';

import { useJobBookmarkMutation } from '@jobstash/jobs/state';

import { BookmarkButton, Heading } from '@jobstash/shared/ui';

interface Props {
  shortUUID: string;
  title: string;
  ts: number;
}

const JobCardHeader = ({ shortUUID, title, ts }: Props) => {
  const timestamp = prettyTimestamp(ts);

  const { isLoading, mutate } = useJobBookmarkMutation();

  const onClick = () => {
    mutate({ shortUUID });
  };

  return (
    <div className="sm:flex items-center justify-between">
      <Heading size="md" fw="semibold">
        {title}
      </Heading>
      <hr className="border-t border-white/10 hidden sm:flex" />
      <div className="hidden items-center sm:flex h-full min-w-fit gap-4">
        <span className="text-sm">{timestamp}</span>

        <BookmarkButton isLoading={isLoading} onClick={onClick} />
      </div>
    </div>
  );
};

export default memo(JobCardHeader);
