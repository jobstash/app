import { useQuery } from '@tanstack/react-query';

import { PERMISSIONS } from '@jobstash/auth/core';

import { useHasPermission } from '@jobstash/auth/state';
import { useMwVersionContext } from '@jobstash/shared/state';
import { getProfileAuthorizedOrgs } from '@jobstash/profile/data';

export const useProfileAuthorizedOrgs = () => {
  const { mwVersion } = useMwVersionContext();
  const hasPermission = useHasPermission(PERMISSIONS.ORG_MEMBER);

  return useQuery({
    queryKey: [mwVersion, 'profile-authorized-orgs'],
    queryFn: () => getProfileAuthorizedOrgs(),
    enabled: hasPermission,
    refetchOnWindowFocus: false,
  });
};
