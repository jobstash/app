import { FilterKind } from '../constants';

export type ConfigSharedProperties = {
  position: number;
  label: string;
  show: boolean;
};

export type ConfigLabeledValue<T> = {
  label: string;
  value: T;
};

type ConfigGenericFields<K, V> = {
  kind: K;
  value: V;
  param_key: string;
};

export type ConfigDateFilter = ConfigSharedProperties &
  ConfigGenericFields<FilterKind.DATE, ConfigLabeledValue<number>[]>;

export type ConfigBooleanFilter = ConfigSharedProperties &
  ConfigGenericFields<FilterKind.BOOLEAN, ConfigLabeledValue<boolean>[]>;

export type ConfigRangeFilter = {
  kind: FilterKind.RANGE;
  step_size: number;
  value: {
    lowest: {
      param_key: string;
      value: number;
    };
    highest: {
      param_key: string;
      value: number;
    };
  };
} & ConfigSharedProperties;

export type ConfigSingleSelectFilter<T = string> = ConfigSharedProperties &
  ConfigGenericFields<FilterKind.SINGLESELECT, ConfigLabeledValue<T>[]>;

export type ConfigMultiSelectFilter<T = string> = ConfigSharedProperties &
  ConfigGenericFields<FilterKind.MULTISELECT, ConfigLabeledValue<T>[]>;

export type ConfigMultiSelectSearchFilter<T = string> = ConfigSharedProperties &
  ConfigGenericFields<FilterKind.MULTISELECT_SEARCH, ConfigLabeledValue<T>[]>;

export type JobsFilterConfig = {
  publication_date: ConfigDateFilter;
  level: ConfigSingleSelectFilter;
  location: ConfigMultiSelectFilter;
  salary: ConfigRangeFilter;
  team_size: ConfigRangeFilter;
  employee_count: ConfigRangeFilter;
  tvl: ConfigRangeFilter;
  monthly_volume: ConfigRangeFilter;
  monthly_active_users: ConfigRangeFilter;
  monthly_revenue: ConfigRangeFilter;
  audits: ConfigRangeFilter;
  hacks: ConfigRangeFilter;
  tech: ConfigMultiSelectSearchFilter;
  organizations: ConfigMultiSelectSearchFilter;
  chains: ConfigMultiSelectSearchFilter;
  projects: ConfigMultiSelectSearchFilter;
  categories: ConfigMultiSelectSearchFilter;
  mainnet: ConfigBooleanFilter;
  token: ConfigBooleanFilter;
};
