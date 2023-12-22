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
  SkillsUsed,
  YourContribution,
} from '@jobstash/profile/ui';
import { RightPanelCardBorder } from '@jobstash/right-panel/ui';
import { Loader } from '@jobstash/shared/ui';

const ProfileRepoRightPanel = () => {
  const { isOpen } = useTour();

  const { activeProfileRepo, tabs, activeTab, isLoadingCard, isLoadingSkills } =
    useProfileRepoPageContext();

  if (!activeProfileRepo) return null;

  return (
    <div className="hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10">
      <ProfileRightPanel
        isLoading={!activeProfileRepo}
        header={<ProfileRightPanelRepoHeader profileRepo={activeProfileRepo} />}
        tabs={<ProfileRightPanelTabs tabs={tabs} activeTab={activeTab} />}
        card={
          <div className={cn({ 'pointer-events-none': isOpen })}>
            <RightPanelCardBorder>
              <LoadingOverlay
                visible={isLoadingCard || isLoadingSkills}
                className="rounded-3xl"
                loader={<Loader />}
                overlayOpacity={0.8}
              />
              <div className="p-8">
                <div className="flex flex-col gap-6 relative">
                  {activeTab === PROFILE_RIGHT_PANEL_TAB.SKILLS_USED && (
                    <SkillsUsed key={activeProfileRepo?.id} />
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
    </div>
  );
};

export default memo(ProfileRepoRightPanel);
