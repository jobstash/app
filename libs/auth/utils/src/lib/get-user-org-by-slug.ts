import { AffiliatedOrganization } from '@jobstash/auth/core';
import { normalizeString } from '@jobstash/shared/utils';

export const getUserOrgBySlug = (
  orgs: AffiliatedOrganization[],
  slug: unknown,
) => {
  if (typeof slug !== 'string') return;

  return orgs.find(({ name }) => normalizeString(name) === slug);
};
