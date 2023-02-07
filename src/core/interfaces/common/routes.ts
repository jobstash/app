import type { RouteSection, RouteTab } from '~/core/types';

export interface RouteSegments {
  section: RouteSection;
  key: string;
  tab: RouteTab;
}
