import { memo } from 'react';

import { type ProfileRepo } from '@jobstash/profile/core';
import { prettyTimestamp } from '@jobstash/shared/utils';

import { Heading, Text } from '@jobstash/shared/ui';

interface Props {
  profileRepo: ProfileRepo;
}

const ProfileRepoCardHeader = ({ profileRepo }: Props) => {
  const { name, timestamp, description } = profileRepo;

  const ts = timestamp ? prettyTimestamp(timestamp) : null;

  return (
    <>
      <div className="items-center justify-between space-y-2 lg:flex lg:space-y-0">
        <Heading size="md" fw="semibold">
          {name}
        </Heading>
        {Boolean(ts) && (
          <div className="hidden items-center lg:justify-center space-x-3 lg:flex">
            <span className="text-sm">{ts}</span>
          </div>
        )}
      </div>
      <div>
        <Text size="md" color="dimmed">
          {description}
        </Text>
      </div>
    </>
  );
};

export default memo(ProfileRepoCardHeader);
