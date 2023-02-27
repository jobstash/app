import type { JobPost } from '~/shared/core/interfaces';
import { slugify } from '~/shared/utils';

export const createJobKey = (post: JobPost) =>
  slugify(`${post.org.name} ${post.details.title} ${post.details.id}`);
