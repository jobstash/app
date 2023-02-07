import {
  TEXT_RIGHT_TAB_COMPETITORS,
  TEXT_RIGHT_TAB_DETAILS,
  TEXT_RIGHT_TAB_JOBS,
  TEXT_RIGHT_TAB_ORGANIZATION,
  TEXT_RIGHT_TAB_PROJECTS,
  TEXT_RIGHT_TAB_REPOSITORIES,
  TEXT_ROUTE_TAB_COMPETITORS,
  TEXT_ROUTE_TAB_DETAILS,
  TEXT_ROUTE_TAB_JOBS,
  TEXT_ROUTE_TAB_ORGANIZATION,
  TEXT_ROUTE_TAB_PROJECTS,
  TEXT_ROUTE_TAB_REPOSITORIES,
} from '~/core/constants';
import type { Listing, RightPanelTab, RouteSegments } from '~/core/interfaces';
import { createRouteString } from '~/shared/utils';

export const getPanelTabs = (
  listing: Listing,
  segments: RouteSegments,
): RightPanelTab[] => {
  const { section, key, tab } = segments;

  const tabs: RightPanelTab[] = [
    {
      label: `${listing.kind} ${TEXT_RIGHT_TAB_DETAILS}`,
      route: createRouteString(section, key, TEXT_ROUTE_TAB_DETAILS),
      isActive: tab === TEXT_ROUTE_TAB_DETAILS,
    },
  ];

  if (listing.org) {
    tabs.push({
      label: TEXT_RIGHT_TAB_ORGANIZATION,
      route: createRouteString(section, key, TEXT_ROUTE_TAB_ORGANIZATION),
      isActive: tab === TEXT_ROUTE_TAB_ORGANIZATION,
    });
  }

  const lenJobs = listing.jobs?.length ?? 0;
  if (lenJobs > 0) {
    tabs.push({
      label: `${TEXT_RIGHT_TAB_JOBS} (${lenJobs})`,
      route: createRouteString(section, key, TEXT_ROUTE_TAB_JOBS),
      isActive: tab === TEXT_ROUTE_TAB_JOBS,
    });
  }

  const lenProjects = listing.projects?.length ?? 0;
  if (lenProjects > 0) {
    tabs.push({
      label: `${TEXT_RIGHT_TAB_PROJECTS} (${lenProjects})`,
      route: createRouteString(section, key, TEXT_ROUTE_TAB_PROJECTS),
      isActive: tab === TEXT_ROUTE_TAB_PROJECTS,
    });
  }

  const lenRepos = listing.repos?.length ?? 0;
  if (lenRepos > 0) {
    tabs.push({
      label: `${TEXT_RIGHT_TAB_REPOSITORIES} (${lenRepos})`,
      route: createRouteString(section, key, TEXT_ROUTE_TAB_REPOSITORIES),
      isActive: tab === TEXT_ROUTE_TAB_REPOSITORIES,
    });
  }

  const lenCompetitors = listing.competitors?.length ?? 0;
  if (lenCompetitors > 0) {
    tabs.push({
      label: `${TEXT_RIGHT_TAB_COMPETITORS} (${lenRepos})`,
      route: createRouteString(section, key, TEXT_ROUTE_TAB_COMPETITORS),
      isActive: tab === TEXT_ROUTE_TAB_COMPETITORS,
    });
  }

  return tabs;
};
