import Head from 'next/head';

import { ROUTE_SECTION, TAB_SEGMENT } from '@jobstash/shared/core';
import { createOrgPageTitle } from '@jobstash/organizations/utils';

import { useOrgDetails } from '@jobstash/organizations/state';

import {
  OrgReviewsSection,
  OrgRightPanelTabs,
} from '@jobstash/organizations/ui';
import {
  createRightPanelOrgTags,
  RightPanel,
  RightPanelBackButton,
  RightPanelHeader,
  RightPanelOrgCard,
  RightPanelOrgJobCards,
  RightPanelProjectCards,
} from '@jobstash/right-panel/ui';
import { Loader } from '@jobstash/shared/ui';

interface Props {
  orgId: string | null;
  currentTab: string;
  hasTitle?: boolean;
}

const OrgsRightPanel = ({ orgId, currentTab, hasTitle }: Props) => {
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
      header={
        <RightPanelHeader
          name={orgDetails.name}
          website={orgDetails.website}
          logo={orgDetails.logoUrl}
          description={orgDetails.summary}
          socials={orgDetails}
          tags={createRightPanelOrgTags(orgDetails)}
          // Community={orgDetails.community}
        />
      }
      tabs={
        <OrgRightPanelTabs currentTab={currentTab} orgDetails={orgDetails} />
      }
      backButton={
        <RightPanelBackButton backURL={ROUTE_SECTION.ORGANIZATIONS} />
      }
    >
      {hasTitle && orgDetails && (
        <Head>
          <title>{createOrgPageTitle(orgDetails.name, currentTab)}</title>
        </Head>
      )}
      {currentTab === TAB_SEGMENT.details && (
        <RightPanelOrgCard
          org={orgDetails}
          showCTA={false}
          routeSection={ROUTE_SECTION.ORGANIZATIONS}
        />
      )}

      {currentTab === TAB_SEGMENT.projects && (
        <RightPanelProjectCards projects={orgDetails.projects} />
      )}

      {currentTab === TAB_SEGMENT.jobs && (
        <RightPanelOrgJobCards
          orgName={orgDetails.name}
          //
          // orgJobs={orgDetails.jobs}
          orgJobs={[]}
        />
      )}

      {currentTab === TAB_SEGMENT.reviews && (
        <OrgReviewsSection org={orgDetails} />
      )}

      {/* TODO: REPOSITORIES TAB */}
    </RightPanel>
  );
};

export default OrgsRightPanel;
