import Image from 'next/image';
import { ReactNode, useEffect } from 'react';

import { useAtom } from 'jotai';

import {
  EVENT_CARD_CLICK,
  ID_TOP_RIGHT_PANEL,
  KIND_POST_JOB,
  KIND_POST_ORG,
  KIND_POST_PROJECT,
  KIND_POST_REPO,
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
  JobPost,
  Organization,
  OrgPost,
  Post,
  ProjectPost,
  RepoPost,
} from '~/core/interfaces';
import { PostKind, RouteSection, RouteTab } from '~/core/types';
import { JobRightPanel, JobsRightPanel } from '~/features/jobs/components';
import { OrgRightPanel } from '~/features/organizations/components';
import {
  ProjectRightPanel,
  ProjectsRightPanel,
} from '~/features/projects/components';
import { RepoRightPanel, ReposRightPanel } from '~/features/repos/components';
import { activePostAtom } from '~/shared/atoms';
import { Button, TagIcon } from '~/shared/components';
import { useRouteSegments } from '~/shared/hooks';

import { getPanelTabs } from '../utils/get-panel-tabs';

type TabPanelMap = Record<RouteTab, ReactNode>;

const getListingDetails = (section: RouteSection, post: Post) => {
  if (section === TEXT_ROUTE_SECTION_JOBS && post.kind === KIND_POST_JOB)
    return <JobRightPanel job={(post as JobPost).details} />;

  if (
    section === TEXT_ROUTE_SECTION_ORGANIZATION &&
    post.kind === KIND_POST_ORG
  )
    return <OrgRightPanel org={(post as OrgPost).details} />;

  if (
    section === TEXT_ROUTE_SECTION_PROJECTS &&
    post.kind === KIND_POST_PROJECT
  )
    return <ProjectRightPanel project={(post as ProjectPost).details} />;

  if (
    section === TEXT_ROUTE_SECTION_REPOSITORIES &&
    post.kind === KIND_POST_REPO
  )
    return <RepoRightPanel repo={(post as RepoPost).details} />;

  return null;
};

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

  const [activeListing] = useAtom(activePostAtom);
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
      <div className="text-ivory" id={ID_TOP_RIGHT_PANEL} />
      <div>
        <div className="flex items-center space-x-3">
          <Image src={org.avatar} width="32" height="32" alt={org.name} />
          <h3 className="font-semibold">{org.name}</h3>
        </div>
        <div className="flex space-x-4 py-4 text-sm">
          {orgTags.map((tag) => (
            <div key={tag.text} className="flex items-center">
              <div className="relative mr-2 h-3 w-3">{tag.icon}</div>
              <p>{tag.text}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-sidebarTitle">{org.summary}</p>
        <div>
          {/* NOTE: button?,link? */}
          <p className="inline-block rounded-sm bg-sidebarTitle text-md">
            {JSON.stringify(org.website)}
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap space-x-2 border-t border-white/20 pt-8">
        {tabs.map((tab) => (
          <Button
            key={tab.label}
            kind="outlined"
            size="md"
            onClick={() =>
              push(tab.route, { shouldScroll: false, shallow: true })
            }
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="mt-8 rounded-3xl bg-gradient-to-l from-primary to-secondary p-1">
        <div className="rounded-3xl bg-grey">{cardMap[tab]}</div>
      </div>
    </div>
  );
};
