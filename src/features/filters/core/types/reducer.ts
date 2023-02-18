import { JobsFilterConfig } from './config';

export type Action<C extends Object, P> = {
  type: keyof C;
  payload: P;
};

// Payload
export type LevelPayload = string;
export type DatePayload = number;
export type RangePayload = { lowest: number; highest: number };

// Actions
export type LevelAction = Action<JobsFilterConfig, LevelPayload>;
export type DateAction = Action<JobsFilterConfig, DatePayload>;
export type RangeAction = Action<JobsFilterConfig, RangePayload>;
export type FilterAction = LevelAction | DateAction | RangeAction;

// State -> contains ui select-options, isChecked etc
export type FilterState = {
  level?: LevelPayload;
  publication_date?: DatePayload;
  salary?: RangePayload;
  team_size?: RangePayload;
  employee_count?: RangePayload;
  tvl?: RangePayload;
  monthly_volume?: RangePayload;
  monthly_active_users?: RangePayload;
  monthly_revenue?: RangePayload;
  audits?: RangePayload;
  hacks?: RangePayload;
};

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
