import { createOrgKey } from './create-org-key';

export const createOrgReviewPath = ({
  name,
  orgId,
}: {
  name: string;
  orgId: string;
}) => `/organizations/${createOrgKey({ name, orgId })}/reviews`;
