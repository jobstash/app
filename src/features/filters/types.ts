import { FILTER_ACTIONS } from './constants';

export type RangeValue = [number, number];
export type DispatchEnumFn = (selected: string) => void;
export type DispatchRangeFn = (range: RangeValue) => void;
export type DispatchMultiSelectFn = (items: MultiSelectItem[]) => void;

export interface MultiSelectItem {
  label: string;
  isChecked: boolean;
}

export interface FilterState {
  level?: string;
  location?: string;
  token?: boolean;
  salary?: RangeValue;
  teamSize?: RangeValue;
  tvl?: RangeValue;
  monthlyVolume?: RangeValue;
  activeUsers?: RangeValue;
  monthlyRevenue?: RangeValue;
  audits?: RangeValue;
  hacks?: RangeValue;
  techs?: MultiSelectItem[];
  organizations?: MultiSelectItem[];
  chains?: MultiSelectItem[];
  projects?: MultiSelectItem[];
  categories?: MultiSelectItem[];
}

export interface FilterAction {
  type: FILTER_ACTIONS;
  payload: Partial<FilterState>;
}

export const enum FilterKind {
  DATE,
  RANGE,
  BOOLEAN,
  SINGLESELECT,
  MULTISELECT,
  MULTISELECT_SEARCH,
}

interface FilterConfigField {
  position: number;
  label: string;
  show: boolean;
}

interface FilterConfigLabeledValues<T> {
  param_key: string;
  value: {
    label: string;
    value: T;
  }[];
}

interface BooleanFilter
  extends FilterConfigField,
    FilterConfigLabeledValues<boolean> {
  kind: FilterKind.BOOLEAN;
}

interface DateFilter
  extends FilterConfigField,
    FilterConfigLabeledValues<number> {
  kind: FilterKind.DATE;
}

interface SingleSelectFilter
  extends FilterConfigField,
    FilterConfigLabeledValues<string> {
  kind: FilterKind.SINGLESELECT;
}

interface MultiSelectFilter
  extends FilterConfigField,
    FilterConfigLabeledValues<string> {
  kind: FilterKind.MULTISELECT;
}

interface MultiSelectSearchFilter
  extends FilterConfigField,
    FilterConfigLabeledValues<string> {
  kind: FilterKind.MULTISELECT_SEARCH;
}

interface RangeFilter extends FilterConfigField {
  kind: FilterKind.RANGE;
  step_size: number;
  param_key: {
    lowest: string;
    highest: string;
  };
  value: {
    lowest: number;
    highest: number;
  };
}

export interface JobFilterConfigs {
  publication_date: DateFilter;
  level: SingleSelectFilter;
  salary: RangeFilter;
  location: MultiSelectFilter;
  team_size: RangeFilter;
  employee_count: RangeFilter;
  tech: MultiSelectSearchFilter;
  organizations: MultiSelectSearchFilter;
  chains: MultiSelectSearchFilter;
  projects: MultiSelectSearchFilter;
  categories: MultiSelectSearchFilter;
  tvl: RangeFilter;
  monthly_volume: RangeFilter;
  monthly_active_users: RangeFilter;
  monthly_revenue: RangeFilter;
  audits: RangeFilter;
  hacks: RangeFilter;
  mainnet: BooleanFilter;
  token: BooleanFilter;
}
