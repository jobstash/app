import { UserAvailableForWork } from '@jobstash/shared/core';

export const getWorkHistoryRepoCount = (
  workHistory: UserAvailableForWork['workHistory'],
) =>
  workHistory.reduce(
    (sum, work) => sum + (work.repositories ? work.repositories.length : 0),
    0,
  );
