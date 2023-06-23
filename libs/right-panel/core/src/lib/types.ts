import { TAB_SEGMENT } from '@jobstash/shared/core';

export interface RightPanelTab {
  text: string;
  tabSegment: typeof TAB_SEGMENT[keyof typeof TAB_SEGMENT];
  href: string;
}
