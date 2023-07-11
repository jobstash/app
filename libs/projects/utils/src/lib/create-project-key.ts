import { slugify } from '@jobstash/shared/utils';

export const createProjectKey = ({ name, id }: { name: string; id: string }) =>
  slugify(`${name} ${id}`);
