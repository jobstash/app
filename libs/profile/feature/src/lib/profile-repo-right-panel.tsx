import { memo } from 'react';

import { LoadingOverlay } from '@mantine/core';
import { useTour } from '@reactour/tour';

import { PROFILE_RIGHT_PANEL_TAB } from '@jobstash/profile/core';
import { cn } from '@jobstash/shared/utils';

import { useProfileRepoPageContext } from '@jobstash/profile/state';

import {
  ProfileRightPanel,
  ProfileRightPanelRepoHeader,
  ProfileRightPanelTabs,
  TechsUsed,
  YourContribution,
} from '@jobstash/profile/ui';
import { RightPanelCardBorder } from '@jobstash/right-panel/ui';

const ProfileRepoRightPanel = () => {
  const { isOpen } = useTour();

  const { activeProfileRepo, tabs, activeTab, isLoadingCard } =
    useProfileRepoPageContext();

  return (
    <ProfileRightPanel
      isLoading={!activeProfileRepo}
      backUrl="/profile/repositories"
      header={<ProfileRightPanelRepoHeader profileRepo={activeProfileRepo} />}
      tabs={<ProfileRightPanelTabs tabs={tabs} activeTab={activeTab} />}
      card={
        <div className={cn({ 'pointer-events-none': isOpen })}>
          <RightPanelCardBorder>
            <LoadingOverlay visible={isLoadingCard} className="rounded-3xl" />
            <div className="p-8">
              <div className="flex flex-col gap-6 relative">
                {activeTab === PROFILE_RIGHT_PANEL_TAB.TECHNOLOGIES_USED && (
                  <TechsUsed key={activeProfileRepo?.id} />
                )}
                {activeTab === PROFILE_RIGHT_PANEL_TAB.YOUR_CONTRIBUTION && (
                  <YourContribution key={activeProfileRepo?.id} />
                )}
              </div>
            </div>
          </RightPanelCardBorder>
        </div>
      }
    />
  );
};

export default memo(ProfileRepoRightPanel);
