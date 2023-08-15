import { memo } from 'react';

import { useTour } from '@reactour/tour';

import { PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import { useProfileReviewsPageContext } from '@jobstash/profile/state';

import {
  ProfileRightPanel,
  ProfileRightPanelOrgHeader,
  ProfileRightPanelTabs,
  Ratings,
  SalaryForm,
  YourReview,
} from '@jobstash/profile/ui';
import { RightPanelCardBorder } from '@jobstash/right-panel/ui';

const ProfileOrgReviewsRightPanel = () => {
  const { isOpen } = useTour();

  const { activeProfileOrgReview, tabs, activeTab } =
    useProfileReviewsPageContext();

  return (
    <ProfileRightPanel
      isLoading={!activeProfileOrgReview}
      backUrl="/profile/reviews"
      header={
        <ProfileRightPanelOrgHeader orgInfo={activeProfileOrgReview?.org} />
      }
      tabs={<ProfileRightPanelTabs tabs={tabs} activeTab={activeTab} />}
      card={
        <div className={cn({ 'pointer-events-none': isOpen })}>
          <RightPanelCardBorder>
            <div className="p-6">
              <div className="flex flex-col gap-6 py-2 relative">
                {activeTab === PROFILE_RIGHT_PANEL_TAB.SALARY && <SalaryForm />}
                {activeTab === PROFILE_RIGHT_PANEL_TAB.RATING && <Ratings />}
                {activeTab === PROFILE_RIGHT_PANEL_TAB.YOUR_REVIEW && (
                  <YourReview />
                )}
              </div>
            </div>
          </RightPanelCardBorder>
        </div>
      }
    />
  );
};

export default memo(ProfileOrgReviewsRightPanel);
