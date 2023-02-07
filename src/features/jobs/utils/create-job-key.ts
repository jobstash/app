import type { JobListing } from '~/core/interfaces';
import { slugify } from '~/shared/utils';

export const createJobKey = (listing: JobListing) =>
  slugify(`${listing.org.name} ${listing.details.title} ${listing.details.id}`);
