import { DevTalent } from '@jobstash/profile/core';

export const getWorkHistoryRepoCount = (
  workHistory: DevTalent['workHistory'],
) =>
  workHistory.reduce(
    (sum, work) => sum + (work.repositories ? work.repositories.length : 0),
    0,
  );
