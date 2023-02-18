import { MultiSelectItem, RangeValue } from './common';

// State -> contains ui select-options, isChecked etc
export type FilterState = {
  level?: string;
  publication_date?: string;
  salary?: RangeValue;
  team_size?: RangeValue;
  employee_count?: RangeValue;
  tvl?: RangeValue;
  monthly_volume?: RangeValue;
  monthly_active_users?: RangeValue;
  monthly_revenue?: RangeValue;
  audits?: RangeValue;
  hacks?: RangeValue;
  location?: MultiSelectItem[];
  //
  // tech?: string;
  // organizations?: string;
  // chains?: string;
  // projects?: string;
  // categories?: string;
  // mainnet?: boolean;
  // token?: boolean;
};

// Actions
export type Action<P> = {
  type: keyof FilterState;
  payload: P;
};
export type LevelAction = Action<string>;
export type DateAction = Action<number>;
export type RangeAction = Action<RangeValue>;
export type MultiSelectAction = Action<MultiSelectItem[]>;
export type FilterAction =
  | LevelAction
  | DateAction
  | RangeAction
  | MultiSelectAction;

// Range filter-state keys
export type FilterStateRangeKey =
  | 'salary'
  | 'team_size'
  | 'employee_count'
  | 'tvl'
  | 'monthly_volume'
  | 'monthly_active_users'
  | 'monthly_revenue'
  | 'audits'
  | 'hacks';

// Multiselect filter-state keys
export type FilterStateMultiSelectKey = 'location';
