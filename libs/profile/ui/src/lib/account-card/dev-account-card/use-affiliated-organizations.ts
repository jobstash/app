import { useProfileVerifiedOrgs } from '@jobstash/profile/state';

export const useAffiliatedOrganizations = () => {
  const { data, isRefetching } = useProfileVerifiedOrgs();

  const orgCount = (data ?? []).length;
  const hasOrg = orgCount > 0;

  return {
    data,
    hasOrg,
    isRefetching,
  };
};
