import { ReactNode } from 'react';

import {
  FILTER_KIND_MULTISELECT,
  FILTER_KIND_MULTISELECT_WITH_SEARCH,
  FILTER_KIND_RANGE,
  FILTER_KIND_SINGLESELECT,
} from './constants';

export interface FilterConfigSharedProperties {
  position: number;
  label: string;
  show: boolean;
  googleAnalyticsEventName?: string;
  googleAnalyticsEventId?: string;
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
  options: { label: string; value: string }[];
}

export interface MultiSelectSearchFilterConfig
  extends FilterConfigSharedProperties {
  kind:
    | typeof FILTER_KIND_MULTISELECT_WITH_SEARCH
    | typeof FILTER_KIND_MULTISELECT;
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
  hacks: RangeFilterConfig;
  fundingRounds: MultiSelectSearchFilterConfig;
  mainNet: SingleSelectFilterConfig;
  token: SingleSelectFilterConfig;
  order: SingleSelectFilterConfig;
  orderBy: SingleSelectFilterConfig;
}

export type RangeValue = [number, number];

export interface FilterState {
  publicationDate?: string;
  seniority?: string;
  salary?: RangeValue;
  locations?: Set<string> | null;
  teamSize?: RangeValue;
  headCount?: RangeValue;
  tvl?: RangeValue;
  tech?: Set<string> | null;
  organizations?: Set<string> | null;
  chains?: Set<string> | null;
  projects?: Set<string> | null;
  categories?: Set<string> | null;
  monthlyVolume?: RangeValue;
  monthlyFees?: RangeValue;
  monthlyRevenue?: RangeValue;
  audits?: RangeValue;
  hacks?: RangeValue;
  mainNet?: string;
  token?: string;
  order?: string;
  orderBy?: string;
}

export interface Action<P> {
  type: keyof FilterState | null;
  payload: P;
}

export type StringAction = Action<string>;
export type RangeAction = Action<RangeValue>;
export type ClearAction = Action<undefined>;

export type MultiSelectAction = Action<Set<string> | null>;
export type FilterAction =
  | StringAction
  | RangeAction
  | MultiSelectAction
  | ClearAction;

export type FilterStateRangeKey =
  | 'salary'
  | 'teamSize'
  | 'headCount'
  | 'tvl'
  | 'monthlyVolume'
  | 'monthlyFees'
  | 'monthlyRevenue'
  | 'audits'
  | 'hacks';

export type FilterStateMultiSelectKey =
  | 'locations'
  | 'tech'
  | 'organizations'
  | 'chains'
  | 'projects'
  | 'categories';

export type ShownSortedConfig = {
  key: keyof FilterState;
  config: FilterConfig[keyof FilterConfig];
};

export type FilterConfigComponent = { key: keyof FilterConfig; ui: ReactNode };
