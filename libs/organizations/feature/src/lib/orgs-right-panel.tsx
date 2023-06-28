import { memo } from 'react';

import { TAB_SEGMENT } from '@jobstash/shared/core';

import { useOrgDetails } from '@jobstash/organizations/state';

import { OrgRightPanelTabs } from '@jobstash/organizations/ui';
import {
  RightPanel,
  RightPanelJobCards,
  RightPanelOrgCard,
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
    >
      {currentTab === TAB_SEGMENT.details && (
        <RightPanelOrgCard org={orgDetails} />
      )}

      {currentTab === TAB_SEGMENT.projects && (
        <RightPanelProjectCards projects={orgDetails.projects} />
      )}

      {currentTab === TAB_SEGMENT.jobs && (
        <RightPanelJobCards jobInfos={orgDetails.jobs} />
      )}
      {/* TODO: REPOSITORIES TAB */}
    </RightPanel>
  );
};

export default memo(OrgsRightPanel);
