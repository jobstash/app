import { useQuery } from '@tanstack/react-query';

import { type OrgDetails } from '@jobstash/organizations/core';

import { getOrgDetails } from '@jobstash/organizations/data';

export const useOrgDetails = (
  orgId: string | null,
  onSuccess?: (orgDetails: OrgDetails) => void,
) =>
  useQuery({
    queryKey: ['org-details', orgId],
    queryFn: () => getOrgDetails(orgId as string),
    staleTime: 1000 * 60 * 60, // 1 hr,
    enabled: Boolean(orgId),
    onSuccess,
  });
