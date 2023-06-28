import {
  type FundingRound,
  type Investor,
  type OrgInfo,
  TAB_SEGMENT,
} from '@jobstash/shared/core';

export interface RightPanelTab {
  text: string;
  tabSegment: typeof TAB_SEGMENT[keyof typeof TAB_SEGMENT];
  href: string;
}

export interface RightPanelOrg extends OrgInfo {
  fundingRounds: FundingRound[];
  investors: Investor[];
}
