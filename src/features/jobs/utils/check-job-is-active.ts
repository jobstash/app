import { JobListResult } from '../core/types';

import { createJobKey } from './create-job-key';

export const checkJobIsActive = (segmentKey: string, post: JobListResult) =>
  segmentKey === createJobKey(post);
