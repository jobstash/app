import { useAtomValue } from 'jotai';

import {
  ORG_ADMIN_TABS,
  orgAdminActiveTabAtom,
} from '@jobstash/organizations/state';

import { OrgAdminEditOrgContent } from './org-admin-edit-org-content/content';
import { OrgAdminEditJobPostsContent } from './org-admin-job-posts-content';

interface Props {
  orgId: string;
}

export const OrgAdminContent = ({ orgId }: Props) => {
  const activeTab = useAtomValue(orgAdminActiveTabAtom);

  if (activeTab === ORG_ADMIN_TABS.ORGANIZATION) {
    return <OrgAdminEditOrgContent orgId={orgId} />;
  }

  if (activeTab === ORG_ADMIN_TABS.JOBS) {
    return <OrgAdminEditJobPostsContent />;
  }

  //
  // if (activeTab === ORG_ADMIN_TABS.PROJECTS) {
  //   return <OrgAdminEditProjectsContent />;
  // }

  return null;
};
