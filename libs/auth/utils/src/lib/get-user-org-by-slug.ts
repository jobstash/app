import { AffilatedOrganization } from '@jobstash/auth/core';
import { normalizeString } from '@jobstash/shared/utils';

export const getUserOrgBySlug = (
  orgs: AffilatedOrganization[],
  slug: unknown,
) => {
  if (typeof slug !== 'string') return;

  return orgs.find(({ name }) => normalizeString(name) === slug);
};
