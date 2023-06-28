import { slugify } from '@jobstash/shared/utils';

export const createOrgKey = ({
  name,
  orgId,
}: {
  name: string;
  orgId: string;
}) => slugify(`${name} ${orgId}`);
