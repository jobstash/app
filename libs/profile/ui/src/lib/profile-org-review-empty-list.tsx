import { memo } from 'react';

import { EmptyResult } from '@jobstash/shared/ui';

const ProfileOrgReviewEmptyList = () => (
  <EmptyResult description="You don't have any organization reviews." />
);

export default memo(ProfileOrgReviewEmptyList);
