import type { JobListing } from '~/core/interfaces';

import { createJobKey } from './create-job-key';

export const checkJobIsActive = (segmentKey: string, listing: JobListing) =>
  segmentKey === createJobKey(listing);
