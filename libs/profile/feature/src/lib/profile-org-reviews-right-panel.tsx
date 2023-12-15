import { memo } from 'react';

import { LoadingOverlay } from '@mantine/core';
import { useTour } from '@reactour/tour';

import { PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import {
  ProfileOrgReviewFormProvider,
  useProfileReviewsPageContext,
} from '@jobstash/profile/state';

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

  const { activeProfileOrgReview, tabs, activeTab, isLoadingCard } =
    useProfileReviewsPageContext();

  if (!activeProfileOrgReview) return null;

  return (
    <div className="hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10">
      <ProfileRightPanel
        isLoading={!activeProfileOrgReview}
        backUrl="/profile/reviews"
        header={
          <ProfileRightPanelOrgHeader orgInfo={activeProfileOrgReview?.org} />
        }
        tabs={<ProfileRightPanelTabs tabs={tabs} activeTab={activeTab} />}
        card={
          <ProfileOrgReviewFormProvider>
            <div className={cn({ 'pointer-events-none': isOpen })}>
              <RightPanelCardBorder>
                <LoadingOverlay
                  visible={isLoadingCard}
                  className="rounded-3xl"
                />
                <div className="p-6">
                  <div className="flex flex-col gap-6 py-2 relative">
                    {activeTab === PROFILE_RIGHT_PANEL_TAB.SALARY && (
                      <SalaryForm />
                    )}
                    {activeTab === PROFILE_RIGHT_PANEL_TAB.RATING && (
                      <Ratings />
                    )}
                    {activeTab === PROFILE_RIGHT_PANEL_TAB.YOUR_REVIEW && (
                      <YourReview />
                    )}
                  </div>
                </div>
              </RightPanelCardBorder>
            </div>
          </ProfileOrgReviewFormProvider>
        }
      />
    </div>
  );
};

export default memo(ProfileOrgReviewsRightPanel);
