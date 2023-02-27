import {
  TEXT_RIGHT_TAB_DETAILS,
  TEXT_RIGHT_TAB_ORGANIZATION,
  TEXT_RIGHT_TAB_PROJECTS,
  TEXT_ROUTE_TAB_DETAILS,
  TEXT_ROUTE_TAB_ORGANIZATION,
  TEXT_ROUTE_TAB_PROJECTS,
} from '~/shared/core/constants';
import type { RightPanelTab, RouteSegments } from '~/shared/core/interfaces';
import type { RouteTab } from '~/shared/core/types';
import { createRouteString } from '~/shared/utils';

/**
 * Create right panel tabs with data ready to be rendered
 * @param label - text appearing in tab button
 * @param tabRoute - tab segment associated with label
 * @param segment - obtained from `useRouteSegments` hook
 * @see {@link RightPanelTab}
 */
const createRightPanelTab = (
  label: string,
  tabRoute: RouteTab,
  { section, key, tab }: RouteSegments,
): RightPanelTab => ({
  label,
  route: createRouteString(section, key, tabRoute),
  isActive: tab === tabRoute,
});

export const createRightPanelJobTabs = (
  segments: RouteSegments,
): RightPanelTab[] => [
  createRightPanelTab(
    `Job ${TEXT_RIGHT_TAB_DETAILS}`,
    TEXT_ROUTE_TAB_DETAILS,
    segments,
  ),
  createRightPanelTab(
    TEXT_RIGHT_TAB_ORGANIZATION,
    TEXT_ROUTE_TAB_ORGANIZATION,
    segments,
  ),
  createRightPanelTab(
    TEXT_RIGHT_TAB_PROJECTS,
    TEXT_ROUTE_TAB_PROJECTS,
    segments,
  ),
  // **Note**: waiting for backend/middleware to implement "Repositories"
  // **Note**: waiting for backend/middleware to implement "Competitors"
];
