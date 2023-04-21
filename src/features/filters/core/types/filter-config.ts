import { FILTER_KIND } from '../constants';

export interface FilterConfigSharedProperties {
  position: number;
  label: string;
  show: boolean;
  googleAnalyticsEventName?: string;
  googleAnalyticsEventId?: string;
}

export interface RangeFilterConfig extends FilterConfigSharedProperties {
  kind: typeof FILTER_KIND.RANGE;
  stepSize: number;
  value: {
    lowest: {
      paramKey: string;
      value: number;
    };
    highest: {
      paramKey: string;
      value: number;
    };
  };
}

export interface SingleSelectFilterConfig extends FilterConfigSharedProperties {
  kind: typeof FILTER_KIND.SINGLE_SELECT;
  paramKey: string;
  options: { label: string; value: string }[];
}

export interface MultiSelectSearchFilterConfig
  extends FilterConfigSharedProperties {
  kind:
    | typeof FILTER_KIND.MULTI_SELECT
    | typeof FILTER_KIND.MULTI_SELECT_WITH_SEARCH;
  paramKey: string;
  options: string[];
}

export interface FilterConfig {
  publicationDate: SingleSelectFilterConfig;
  salary: RangeFilterConfig;
  seniority: MultiSelectSearchFilterConfig;
  locations: MultiSelectSearchFilterConfig;
  teamSize: RangeFilterConfig;
  headCount: RangeFilterConfig;
  tech: MultiSelectSearchFilterConfig;
  organizations: MultiSelectSearchFilterConfig;
  chains: MultiSelectSearchFilterConfig;
  projects: MultiSelectSearchFilterConfig;
  categories: MultiSelectSearchFilterConfig;
  tvl: RangeFilterConfig;
  monthlyVolume: RangeFilterConfig;
  monthlyFees: RangeFilterConfig;
  monthlyRevenue: RangeFilterConfig;
  audits: RangeFilterConfig;
  hacks: SingleSelectFilterConfig;
  fundingRounds: MultiSelectSearchFilterConfig;
  mainNet: SingleSelectFilterConfig;
  token: SingleSelectFilterConfig;
  order: SingleSelectFilterConfig;
  orderBy: SingleSelectFilterConfig;
}

export type FilterValues = Record<string, string | null>;
