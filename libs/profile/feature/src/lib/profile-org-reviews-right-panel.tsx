import { memo, useMemo, useState } from 'react';

import { useAtomValue } from 'jotai';

import {
  PROFILE_RIGHT_PANEL_TAB,
  PROFILE_RIGHT_PANEL_TABS,
} from '@jobstash/profile/core';

import { activeProfileOrgReviewAtom } from '@jobstash/profile/state';

import {
  ProfileRightPanel,
  ProfileRightPanelOrgHeader,
  ProfileRightPanelRating,
  ProfileRightPanelSalary,
  ProfileRightPanelTabs,
  ProfileRightPanelYourReview,
} from '@jobstash/profile/ui';
import { RightPanelCardBorder } from '@jobstash/right-panel/ui';

const ProfileOrgReviewsRightPanel = () => {
  const activeProfileOrgReview = useAtomValue(activeProfileOrgReviewAtom);

  const [activeTab, setActiveTab] = useState(
    PROFILE_RIGHT_PANEL_TABS.ORG_REVIEWS[0],
  );

  const tabs = useMemo(
    () =>
      PROFILE_RIGHT_PANEL_TABS.ORG_REVIEWS.map((text) => ({
        text,
        onClick: () => setActiveTab(text),
      })),
    [],
  );

  return (
    <ProfileRightPanel
      isLoading={!activeProfileOrgReview}
      backUrl="/profile/reviews"
      header={
        <ProfileRightPanelOrgHeader orgInfo={activeProfileOrgReview?.org} />
      }
      tabs={<ProfileRightPanelTabs tabs={tabs} activeTab={activeTab} />}
      card={
        activeProfileOrgReview ? (
          <RightPanelCardBorder>
            <div className="p-6">
              <div className="flex flex-col gap-6 py-2 relative">
                {activeTab === PROFILE_RIGHT_PANEL_TAB.SALARY && (
                  <ProfileRightPanelSalary
                    key={activeProfileOrgReview.org.id}
                    orgReview={activeProfileOrgReview}
                  />
                )}
                {activeTab === PROFILE_RIGHT_PANEL_TAB.RATING && (
                  <ProfileRightPanelRating
                    key={activeProfileOrgReview.org.id}
                    orgReview={activeProfileOrgReview}
                  />
                )}
                {activeTab === PROFILE_RIGHT_PANEL_TAB.YOUR_REVIEW && (
                  <ProfileRightPanelYourReview
                    key={activeProfileOrgReview.org.id}
                    orgReview={activeProfileOrgReview}
                  />
                )}
              </div>
            </div>
          </RightPanelCardBorder>
        ) : null
      }
    />
  );
};

export default memo(ProfileOrgReviewsRightPanel);
