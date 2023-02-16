import { FilterKind } from './constants';
import type { ParamKey, RangeParamKey, RangeValue } from './types';

export interface ConfigSharedProperties {
  position: number;
  label: string;
  show: boolean;
}

interface FilterLabeledValues<T> {
  value: {
    label: string;
    value: T;
  }[];
}

interface FilterGenericFields<K, V, P = ParamKey> {
  kind: K;
  value: V;
  param_key: P;
}

export interface BooleanFilter
  extends ConfigSharedProperties,
    FilterGenericFields<FilterKind.BOOLEAN, FilterLabeledValues<boolean>> {}

export interface DateFilter
  extends ConfigSharedProperties,
    FilterGenericFields<FilterKind.DATE, FilterLabeledValues<number>> {}

export interface SingleSelectFilter
  extends ConfigSharedProperties,
    FilterGenericFields<FilterKind.SINGLESELECT, FilterLabeledValues<string>> {}

export interface MultiSelectFilter
  extends ConfigSharedProperties,
    FilterGenericFields<FilterKind.MULTISELECT, FilterLabeledValues<string>> {}

export interface MultiSelectSearchFilter
  extends ConfigSharedProperties,
    FilterGenericFields<
      FilterKind.MULTISELECT_SEARCH,
      FilterLabeledValues<string>
    > {}

export interface RangeFilter
  extends ConfigSharedProperties,
    FilterGenericFields<FilterKind.RANGE, RangeValue, RangeParamKey> {
  step_size: number;
}

export interface JobsFilterConfig {
  publication_date: DateFilter;
  level: SingleSelectFilter;
  location: MultiSelectFilter;
  salary: RangeFilter;
  team_size: RangeFilter;
  employee_count: RangeFilter;
  tvl: RangeFilter;
  monthly_volume: RangeFilter;
  monthly_active_users: RangeFilter;
  monthly_revenue: RangeFilter;
  audits: RangeFilter;
  hacks: RangeFilter;
  tech: MultiSelectSearchFilter;
  organizations: MultiSelectSearchFilter;
  chains: MultiSelectSearchFilter;
  projects: MultiSelectSearchFilter;
  categories: MultiSelectSearchFilter;
  mainnet: BooleanFilter;
  token: BooleanFilter;
}
