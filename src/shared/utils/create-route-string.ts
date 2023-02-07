import type { RouteSection, RouteTab } from '~/core/types';

export const createRouteString = (
  section: RouteSection,
  key: string,
  tab: RouteTab,
) => `/${section}/${key}/${tab}`;
