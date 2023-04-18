import { Job } from '../core/types';

import { createJobKey } from './create-job-key';

export const checkJobIsActive = (segmentKey: string, post: Job) =>
  segmentKey === createJobKey(post);
