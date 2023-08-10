import { memo, useMemo, useState } from 'react';

import { useAtomValue } from 'jotai';

import {
  PROFILE_RIGHT_PANEL_TAB,
  PROFILE_RIGHT_PANEL_TABS,
} from '@jobstash/profile/core';

import { activeProfileRepoAtom } from '@jobstash/profile/state';
import { useAllTechnologies } from '@jobstash/shared/state';

import {
  ProfileRightPanel,
  ProfileRightPanelRepoHeader,
  ProfileRightPanelTabs,
  ProfileRightPanelTechsUsed,
  ProfileRightPanelYourContribution,
} from '@jobstash/profile/ui';
import { RightPanelCardBorder } from '@jobstash/right-panel/ui';

const ProfileRepoRightPanel = () => {
  const activeProfileRepo = useAtomValue(activeProfileRepoAtom);

  const [activeTab, setActiveTab] = useState(
    PROFILE_RIGHT_PANEL_TABS.REPOSITORIES[0],
  );

  const tabs = useMemo(
    () =>
      PROFILE_RIGHT_PANEL_TABS.REPOSITORIES.map((text) => ({
        text,
        onClick: () => setActiveTab(text),
      })),
    [],
  );

  const { data: allTechnologiesData } = useAllTechnologies();

  return (
    <ProfileRightPanel
      isLoading={!activeProfileRepo}
      backUrl="/profile/repositories"
      header={<ProfileRightPanelRepoHeader profileRepo={activeProfileRepo} />}
      tabs={<ProfileRightPanelTabs tabs={tabs} activeTab={activeTab} />}
      card={
        <RightPanelCardBorder>
          <div className="p-6">
            <div className="flex flex-col gap-6 py-2 relative">
              {activeTab === PROFILE_RIGHT_PANEL_TAB.TECHNOLOGIES_USED && (
                <ProfileRightPanelTechsUsed
                  key={activeProfileRepo?.id}
                  options={allTechnologiesData?.technologies ?? []}
                  profileRepo={activeProfileRepo}
                />
              )}
              {activeTab === PROFILE_RIGHT_PANEL_TAB.YOUR_CONTRIBUTION && (
                <ProfileRightPanelYourContribution
                  key={activeProfileRepo?.id}
                  username="0xDevoor"
                  profileRepo={activeProfileRepo}
                />
              )}
            </div>
          </div>
        </RightPanelCardBorder>
      }
    />
  );
};

export default memo(ProfileRepoRightPanel);
