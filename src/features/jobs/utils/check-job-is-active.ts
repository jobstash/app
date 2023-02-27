import { JobPost } from '../core/interfaces';

import { createJobKey } from './create-job-key';

export const checkJobIsActive = (segmentKey: string, post: JobPost) =>
  segmentKey === createJobKey(post);
