import { FilterKind } from '../constants';

export type FilterConfigSharedProperties = {
  position: number;
  label: string;
  show: boolean;
};

export type FilterConfigLabeledValue<T> = {
  label: string;
  value: T;
};

type FilterConfigGenericFields<K, V> = {
  kind: K;
  value: V;
  param_key: string;
};

export type DateFilterConfig = FilterConfigSharedProperties &
  FilterConfigGenericFields<
    FilterKind.DATE,
    FilterConfigLabeledValue<number>[]
  >;

export type BooleanFilterConfig = FilterConfigSharedProperties &
  FilterConfigGenericFields<
    FilterKind.BOOLEAN,
    FilterConfigLabeledValue<boolean>[]
  >;

export type RangeFilterConfig = {
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
} & FilterConfigSharedProperties;

export type SingleSelectFilterConfig<T = string> =
  FilterConfigSharedProperties &
    FilterConfigGenericFields<
      FilterKind.SINGLESELECT,
      FilterConfigLabeledValue<T>[]
    >;

export type MultiSelectFilterConfig<T = string> = FilterConfigSharedProperties &
  FilterConfigGenericFields<
    FilterKind.MULTISELECT,
    FilterConfigLabeledValue<T>[]
  >;

export type MultiSelectSearchFilterConfig<T = string> =
  FilterConfigSharedProperties &
    FilterConfigGenericFields<
      FilterKind.MULTISELECT_SEARCH,
      FilterConfigLabeledValue<T>[]
    >;

export type FilterConfig = {
  publication_date: DateFilterConfig;
  level: SingleSelectFilterConfig;
  location: MultiSelectFilterConfig;
  salary: RangeFilterConfig;
  team_size: RangeFilterConfig;
  employee_count: RangeFilterConfig;
  tvl: RangeFilterConfig;
  monthly_volume: RangeFilterConfig;
  monthly_active_users: RangeFilterConfig;
  monthly_revenue: RangeFilterConfig;
  audits: RangeFilterConfig;
  hacks: RangeFilterConfig;
  tech: MultiSelectSearchFilterConfig;
  organizations: MultiSelectSearchFilterConfig;
  chains: MultiSelectSearchFilterConfig;
  projects: MultiSelectSearchFilterConfig;
  categories: MultiSelectSearchFilterConfig;
  mainnet: BooleanFilterConfig;
  token: BooleanFilterConfig;
};
