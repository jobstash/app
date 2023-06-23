import { type OrgPost } from '@jobstash/organizations/core';
import { slugify } from '@jobstash/shared/utils';

export const createOrgKey = ({ name, orgId }: OrgPost) =>
  slugify(`${name} ${orgId}`);
