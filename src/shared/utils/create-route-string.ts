import type { RouteSection, RouteTab } from '~/shared/core/types';

export const createRouteString = (
  section: RouteSection,
  key: string,
  tab: RouteTab,
) => `/${section}/${key}/${tab}`;
