import { ReactNode, useEffect } from 'react';

import { useAtom } from 'jotai';

import {
  EVENT_CARD_CLICK,
  ID_TOP_RIGHT_PANEL,
  KIND_LISTING_JOB,
  KIND_LISTING_ORG,
  KIND_LISTING_PROJECT,
  KIND_LISTING_REPO,
  TEXT_ROUTE_SECTION_JOBS,
  TEXT_ROUTE_SECTION_ORGANIZATION,
  TEXT_ROUTE_SECTION_PROJECTS,
  TEXT_ROUTE_SECTION_REPOSITORIES,
  TEXT_ROUTE_TAB_COMPETITORS,
  TEXT_ROUTE_TAB_DETAILS,
  TEXT_ROUTE_TAB_JOBS,
  TEXT_ROUTE_TAB_ORGANIZATION,
  TEXT_ROUTE_TAB_PROJECTS,
  TEXT_ROUTE_TAB_REPOSITORIES,
} from '~/core/constants';
import type {
  Job,
  JobListing,
  Listing,
  Organization,
  OrgListing,
  ProjectListing,
  RepoListing,
} from '~/core/interfaces';
import { ListingKind, RouteSection, RouteTab } from '~/core/types';
import { JobRightPanel, JobsRightPanel } from '~/features/jobs/components';
import { OrgRightPanel } from '~/features/organizations/components';
import {
  ProjectRightPanel,
  ProjectsRightPanel,
} from '~/features/projects/components';
import { RepoRightPanel, ReposRightPanel } from '~/features/repos/components';
import { activeListingAtom } from '~/shared/atoms';
import { Button, TagIcon } from '~/shared/components';
import { useRouteSegments } from '~/shared/hooks';

import { getPanelTabs } from '../utils/get-panel-tabs';

type TabPanelMap = Record<RouteTab, ReactNode>;

const getListingDetails = (section: RouteSection, listing: Listing) => {
  if (section === TEXT_ROUTE_SECTION_JOBS && listing.kind === KIND_LISTING_JOB)
    return <JobRightPanel job={(listing as JobListing).details} />;

  if (
    section === TEXT_ROUTE_SECTION_ORGANIZATION &&
    listing.kind === KIND_LISTING_ORG
  )
    return <OrgRightPanel org={(listing as OrgListing).details} />;

  if (
    section === TEXT_ROUTE_SECTION_PROJECTS &&
    listing.kind === KIND_LISTING_PROJECT
  )
    return <ProjectRightPanel project={(listing as ProjectListing).details} />;

  if (
    section === TEXT_ROUTE_SECTION_REPOSITORIES &&
    listing.kind === KIND_LISTING_REPO
  )
    return <RepoRightPanel repo={(listing as RepoListing).details} />;

  return null;
};

// *** UNSTYLED ***
export const RightPanel = () => {
  // Whenever a card is clicked, scroll right-panel to top
  useEffect(() => {
    const scrollListener = () => {
      const el = document.querySelector('#' + ID_TOP_RIGHT_PANEL);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };

    document.addEventListener(EVENT_CARD_CLICK, scrollListener);
    return () => document.removeEventListener(EVENT_CARD_CLICK, scrollListener);
  }, []);

  const { segments, push } = useRouteSegments();
  const { section, tab } = segments;

  const [activeListing] = useAtom(activeListingAtom);
  if (!activeListing) return null;

  const { details, jobs, projects, repos, competitors } = activeListing;

  const org = activeListing.org ?? (details as Organization);
  const orgTags = [
    { text: org.location, icon: <TagIcon filename="location" /> },
    {
      text: `Team Size: ${org.teamSize}`,
      icon: <TagIcon filename="users-three" />,
    },
    {
      text: `Funding: ${org.funding.date}`,
      icon: <TagIcon filename="funding" />,
    },
  ];

  const tabs = getPanelTabs(activeListing, segments);

  const cardMap: TabPanelMap = {
    [TEXT_ROUTE_TAB_DETAILS]: getListingDetails(section, activeListing),
    [TEXT_ROUTE_TAB_ORGANIZATION]: <OrgRightPanel org={org} />,
    [TEXT_ROUTE_TAB_JOBS]: <JobsRightPanel jobs={jobs} />,
    [TEXT_ROUTE_TAB_PROJECTS]: <ProjectsRightPanel projects={projects} />,
    [TEXT_ROUTE_TAB_REPOSITORIES]: <ReposRightPanel repos={repos} />,
    [TEXT_ROUTE_TAB_COMPETITORS]: <ProjectsRightPanel projects={competitors} />,
  };

  return (
    <div>
      {/* NOTE: This component needs to be always on top */}
      <div className="top-0" id={ID_TOP_RIGHT_PANEL} />
      <div>
        <div>
          <p>{org.name}</p>
          <p>{org.avatar}</p>
        </div>
        {orgTags.map((tag) => (
          <div key={tag.text}>
            {tag.icon}
            <p>{tag.text}</p>
          </div>
        ))}
        <div>
          <p>{org.summary}</p>
        </div>
        <div>
          <p>{JSON.stringify(org.website)}</p>
        </div>
      </div>

      <hr />

      <div>
        {tabs.map((tab) => (
          <Button
            key={tab.label}
            onClick={() =>
              push(tab.route, { shouldScroll: false, shallow: true })
            }
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div>{cardMap[tab]}</div>
    </div>
  );
};
