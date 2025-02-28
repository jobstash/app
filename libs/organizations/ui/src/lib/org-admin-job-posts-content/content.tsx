import { useAtomValue } from 'jotai';

import { ProfileVerifiedOrg } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import { activeOrgJobAtom } from '@jobstash/organizations/state';
import { isOpenTopBannerAtom } from '@jobstash/shared/state';

import { OrgJobEditModal } from './edit-modal';
import { OrgJobList } from './org-job-list';
import { OrgJobRightPanel } from './right-panel';

interface Props {
  org: ProfileVerifiedOrg;
}

export const OrgAdminEditJobPostsContent = ({ org }: Props) => {
  const activeJob = useAtomValue(activeOrgJobAtom);
  const isOpenTopBanner = useAtomValue(isOpenTopBannerAtom);

  return (
    <div className="flex gap-8">
      <div className="pt-8 w-[calc(50%-32px)]">
        <OrgJobList orgId={org.id} />
      </div>
      {activeJob && (
        <div
          className={cn(
            'hide-scrollbar fixed inset-0 h-dvh overflow-y-auto bg-dark px-4 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-[calc(50%-128px)] lg:px-6 lg:pr-10 lg:mt-[100px] lg:h-[calc(100vh-100px)] z-50',
            { 'lg:mt-[140px] lg:h-[calc(100vh-140px)]': isOpenTopBanner },
          )}
        >
          <OrgJobRightPanel />
        </div>
      )}

      <OrgJobEditModal />
    </div>
  );
};
