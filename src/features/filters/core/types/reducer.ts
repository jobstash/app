import { RangeValue } from './common';

export type FilterState = {
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
};

export type Action<P> = {
  type: keyof FilterState | null;
  payload: P;
};

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
