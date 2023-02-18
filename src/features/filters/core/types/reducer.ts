import { RangeValue } from './common';

// State -> contains ui select-options, isChecked etc
export type FilterState = {
  level?: string;
  publication_date?: number;
  salary?: RangeValue;
  team_size?: RangeValue;
  employee_count?: RangeValue;
  tvl?: RangeValue;
  monthly_volume?: RangeValue;
  monthly_active_users?: RangeValue;
  monthly_revenue?: RangeValue;
  audits?: RangeValue;
  hacks?: RangeValue;
};

// Actions
export type Action<P> = {
  type: keyof FilterState;
  payload: P;
};
export type LevelAction = Action<string>;
export type DateAction = Action<number>;
export type RangeAction = Action<RangeValue>;
export type FilterAction = LevelAction | DateAction | RangeAction;

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
