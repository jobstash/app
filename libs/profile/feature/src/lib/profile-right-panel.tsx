import { memo, type ReactNode } from 'react';

import { type ProfileRepo, ProfileRightPanelTab } from '@jobstash/profile/core';

import {
  ProfileRightPanelHeader,
  ProfileRightPanelTabs,
} from '@jobstash/profile/ui';
import {
  RightPanelMobileNav,
  RightPanelWrapper,
} from '@jobstash/right-panel/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  backUrl: string;
  profileRepo: ProfileRepo | null;
  activeTab: string;
  tabs: ProfileRightPanelTab[];
  card: ReactNode;
}

const ProfileRightPanel = (props: Props) => {
  const { backUrl, profileRepo, activeTab, tabs, card } = props;

  if (!profileRepo) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <RightPanelWrapper>
      <RightPanelMobileNav backURL={backUrl} />
      <ProfileRightPanelHeader profileRepo={profileRepo} />
      <hr className="border-t border-white/10 -mt-1" />
      <ProfileRightPanelTabs tabs={tabs} activeTab={activeTab} />
      {card}
    </RightPanelWrapper>
  );
};

export default memo(ProfileRightPanel);
