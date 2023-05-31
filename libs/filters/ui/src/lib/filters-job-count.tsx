import { memo } from 'react';

import { Text } from '@jobstash/shared/ui';

interface Props {
  jobCount?: number;
}

const FiltersJobCount = ({ jobCount }: Props) => {
  if (!jobCount) return null;

  return (
    <div>
      {jobCount && (
        <Text
          className="my-3 inline-block whitespace-nowrap"
          color="dimmed"
        >{`Jobs Found: ${jobCount}`}</Text>
      )}
    </div>
  );
};

export default memo(FiltersJobCount);
