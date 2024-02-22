import { LoadingPage } from '@jobstash/shared/pages';

import { CHECK_WALLET_FLOWS, CHECK_WALLET_ROLES } from '@jobstash/auth/core';

import { useAuthContext } from '@jobstash/auth/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import { ProfileDevPage } from './profile-dev-page';
import { ProfileOrgPage } from './profile-org-page';
import { ProfileOrgPendingPage } from './profile-org-pending-page';
import { ProfileOrgRejectedPage } from './profile-org-rejected-page';

export const ProfilePage = () => {
  const { isLoading, role, flow } = useAuthContext();
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  if (!canRender || isLoading) return <LoadingPage />;

  const isDev = role === CHECK_WALLET_ROLES.DEV;
  if (isDev) return <ProfileDevPage />;

  const isOrg = role === CHECK_WALLET_ROLES.ORG;
  const isOrgFlow = ORG_FLOWS_SET.has(flow as typeof ORG_FLOWS[number]);
  if (isOrg && isOrgFlow) {
    return ORG_ROLE_PAGE[flow as keyof typeof ORG_ROLE_PAGE];
  }

  return <LoadingPage />;
};

const ORG_FLOWS = [
  CHECK_WALLET_FLOWS.ORG_APPROVAL,
  CHECK_WALLET_FLOWS.ORG_REJECTED,
  CHECK_WALLET_FLOWS.ORG_COMPLETE,
];
const ORG_FLOWS_SET = new Set(ORG_FLOWS);

const ORG_ROLE_PAGE = {
  [CHECK_WALLET_FLOWS.ORG_APPROVAL]: <ProfileOrgPendingPage />,
  [CHECK_WALLET_FLOWS.ORG_REJECTED]: <ProfileOrgRejectedPage />,
  [CHECK_WALLET_FLOWS.ORG_COMPLETE]: <ProfileOrgPage />,
};
