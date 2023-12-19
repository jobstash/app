import { memo } from 'react';

import { ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';

import { useOrgDetails } from '@jobstash/organizations/state';

import {
  OrgReviewsSection,
  OrgRightPanelTabs,
} from '@jobstash/organizations/ui';
import {
  RightPanel,
  RightPanelBackButton,
  RightPanelOrgCard,
  RightPanelOrgJobCards,
  RightPanelProjectCards,
} from '@jobstash/right-panel/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  orgId: string | null;
  currentTab: string;
}

const OrgsRightPanel = ({ orgId, currentTab }: Props) => {
  const { data: orgDetails } = useOrgDetails(orgId);

  if (!orgDetails) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <RightPanel
      org={orgDetails}
      tabs={
        <OrgRightPanelTabs currentTab={currentTab} orgDetails={orgDetails} />
      }
      backButton={
        <RightPanelBackButton backURL={ROUTE_SECTION.ORGANIZATIONS} />
      }
    >
      {currentTab === TAB_SEGMENT.details && (
        <RightPanelOrgCard org={orgDetails} showCTA={false} />
      )}

      {currentTab === TAB_SEGMENT.projects && (
        <RightPanelProjectCards projects={orgDetails.projects} />
      )}

      {currentTab === TAB_SEGMENT.jobs && (
        <RightPanelOrgJobCards
          orgName={orgDetails.name}
          orgJobs={orgDetails.jobs}
        />
      )}

      {currentTab === TAB_SEGMENT.reviews && (
        <OrgReviewsSection org={orgDetails} />
      )}

      {/* TODO: REPOSITORIES TAB */}
    </RightPanel>
  );
};

export default memo(OrgsRightPanel);
