import { memo } from 'react';

import { EmptyResult } from '@jobstash/shared/ui';

const ProfileRepoEmptyList = () => (
  <EmptyResult description="You don't have any repositories attached to your account." />
);

export default memo(ProfileRepoEmptyList);
