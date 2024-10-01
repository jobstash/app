import { useRouter } from 'next/router';
import { useReducer } from 'react';

import { useAffiliatedOrgs } from '@jobstash/auth/state';

export const useAffiliatedOrganizations = () => {
  const [isEditing, toggleEdit] = useReducer((prev) => !prev, false);

  const { data, isRefetching } = useAffiliatedOrgs();

  const orgCount = (data ?? []).length;
  const hasOrg = orgCount > 0;

  const router = useRouter();

  const getOnManageFn = (slug: string) => () => {
    router.push(`/profile/organizations/${slug}`);
  };

  return {
    isEditing,
    toggleEdit,
    data,
    hasOrg,
    getOnManageFn,
    isRefetching,
  };
};
