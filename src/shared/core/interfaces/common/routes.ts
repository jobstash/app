import type { RouteSection, RouteTab } from '~/shared/core/types';

export interface RouteSegments {
  section: RouteSection;
  key: string;
  tab: RouteTab;
}
