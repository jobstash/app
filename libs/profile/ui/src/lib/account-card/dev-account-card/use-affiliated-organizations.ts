import { useAffiliatedOrgs } from '@jobstash/auth/state';

export const useAffiliatedOrganizations = () => {
  const { data, isRefetching } = useAffiliatedOrgs();

  const orgCount = (data ?? []).length;
  const hasOrg = orgCount > 0;

  return {
    data,
    hasOrg,
    isRefetching,
  };
};
