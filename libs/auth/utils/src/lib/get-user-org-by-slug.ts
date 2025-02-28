import { ProfileVerifiedOrg } from '@jobstash/profile/core';
import { normalizeString } from '@jobstash/shared/utils';

export const getUserOrgBySlug = (orgs: ProfileVerifiedOrg[], slug: unknown) => {
  if (typeof slug !== 'string') return;

  return orgs.find(({ name }) => normalizeString(name) === slug);
};
