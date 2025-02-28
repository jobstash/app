import { useQuery } from '@tanstack/react-query';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useHasPermission } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getProfileOrgSubscriptions } from '@jobstash/profile/data';

export const useProfileOrgSubscriptions = (orgId: string) => {
  const { mwVersion } = useMwVersionContext();
  const hasPermission = useHasPermission(PERMISSIONS.ORG_OWNER);

  return useQuery({
    queryKey: [mwVersion, 'profile-org-subscriptions', orgId],
    queryFn: () => getProfileOrgSubscriptions(orgId),
    enabled: hasPermission,
    refetchOnWindowFocus: false,
  });
};
