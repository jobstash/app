import myzod, { Infer } from 'myzod';

import { profileInfoSchema } from '@jobstash/profile/core';

export * from './blocked-terms';
export * from './jobs';
export * from './paired-terms';
export * from './preferred-terms';

export const pendingOrgsSchema = myzod.array(profileInfoSchema);
export type PendingOrgs = Infer<typeof pendingOrgsSchema>;
