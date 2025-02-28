import { useAtomValue } from 'jotai';

import { ProfileVerifiedOrg } from '@jobstash/profile/core';

import {
  ORG_ADMIN_TABS,
  orgAdminActiveTabAtom,
} from '@jobstash/organizations/state';

import { OrgAdminApplicantsContent } from './org-admin-applicants-content';
import { OrgAdminAtsContent } from './org-admin-ats-content';
import { OrgAdminEditOrgContent } from './org-admin-edit-org-content';
import { OrgAdminEditJobPostsContent } from './org-admin-job-posts-content';

interface Props {
  org: ProfileVerifiedOrg;
}

export const OrgAdminContent = ({ org }: Props) => {
  const activeTab = useAtomValue(orgAdminActiveTabAtom);

  if (activeTab === ORG_ADMIN_TABS.ORGANIZATION) {
    return <OrgAdminEditOrgContent org={org} />;
  }

  if (activeTab === ORG_ADMIN_TABS.JOBS) {
    return <OrgAdminEditJobPostsContent org={org} />;
  }

  if (activeTab === ORG_ADMIN_TABS.APPLICANTS) {
    return <OrgAdminApplicantsContent org={org} />;
  }

  if (activeTab === ORG_ADMIN_TABS.ATS) {
    return <OrgAdminAtsContent org={org} />;
  }

  //
  // if (activeTab === ORG_ADMIN_TABS.PROJECTS) {
  //   return <OrgAdminEditProjectsContent />;
  // }

  return null;
};
