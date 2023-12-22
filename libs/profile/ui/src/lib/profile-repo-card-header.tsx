import { memo } from 'react';

import { type ProfileRepo } from '@jobstash/profile/core';
import { prettyTimestamp } from '@jobstash/shared/utils';

import {
  CardSet,
  CommitIcon,
  Heading,
  RepoProjectNameIcon,
  Text,
} from '@jobstash/shared/ui';

interface Props {
  profileRepo: ProfileRepo;
}

const ProfileRepoCardHeader = ({ profileRepo }: Props) => {
  const { name, timestamp, description, projectName, committers } = profileRepo;

  const ts = prettyTimestamp(timestamp);

  return (
    <>
      <div className="items-center justify-between space-y-2 lg:flex lg:space-y-0">
        <Heading size="md" fw="semibold">
          {name}
        </Heading>
        <div className="hidden items-center lg:justify-center space-x-3 lg:flex">
          <span className="text-sm">{ts}</span>
        </div>
      </div>
      <div>
        <Text size="md" color="dimmed">
          {description}
        </Text>
      </div>
      <div className="flex gap-8 items-center">
        {projectName && (
          <CardSet
            icon={<RepoProjectNameIcon />}
          >{`Project: ${projectName}`}</CardSet>
        )}
        {committers && (
          <CardSet icon={<CommitIcon />}>{`Committers: ${committers}`}</CardSet>
        )}
      </div>
    </>
  );
};

export default memo(ProfileRepoCardHeader);
