import {
  FILTER_KIND_MULTISELECT_WITH_SEARCH,
  FILTER_KIND_RANGE,
  FILTER_KIND_SINGLESELECT,
} from '../constants';

export interface FilterConfigSharedProperties {
  position: number;
  label: string;
  show: boolean;
  googleAnalyticsEventName?: string;
  googleAnalyticsEventId?: string;
}

export interface FilterConfigLabeledValue {
  label: string;
  value: string;
}

export interface RangeFilterConfig extends FilterConfigSharedProperties {
  kind: typeof FILTER_KIND_RANGE;
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
  kind: typeof FILTER_KIND_SINGLESELECT;
  paramKey: string;
  options: FilterConfigLabeledValue[];
}

export interface MultiSelectSearchFilterConfig
  extends FilterConfigSharedProperties {
  kind: typeof FILTER_KIND_MULTISELECT_WITH_SEARCH;
  paramKey: string;
  options: FilterConfigLabeledValue[];
}

export interface FilterConfig {
  publicationDate: SingleSelectFilterConfig;
  salary: RangeFilterConfig;
  seniority: SingleSelectFilterConfig;
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
  hacks: RangeFilterConfig;
  mainNet: SingleSelectFilterConfig;
  token: SingleSelectFilterConfig;
  order: SingleSelectFilterConfig;
  orderBy: SingleSelectFilterConfig;
}
