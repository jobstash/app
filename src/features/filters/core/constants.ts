export const FILTER_KIND_RANGE = 'RANGE';
export const FILTER_KIND_SINGLESELECT = 'SINGLE_SELECT';
export const FILTER_KIND_MULTISELECT = 'MULTI_SELECT';
export const FILTER_KIND_MULTISELECT_WITH_SEARCH = 'MULTI_SELECT_WITH_SEARCH';

export const KEY_PUBLICATION_DATE = 'publicationDate';
export const KEY_SALARY = 'salary';
export const KEY_SENIORITY = 'seniority';
export const KEY_LOCATIONS = 'locations';
export const KEY_TEAM_SIZE = 'teamSize';
export const KEY_HEAD_COUNT = 'headCount';
export const KEY_TECH = 'tech';
export const KEY_ORGANIZATIONS = 'organizations';
export const KEY_CHAINS = 'chains';
export const KEY_PROJECTS = 'projects';
export const KEY_CATEGORIES = 'categories';
export const KEY_TVL = 'tvl';
export const KEY_MONTHLY_VOLUME = 'monthlyVolume';
export const KEY_MONTHLY_FEES = 'monthlyFees';
export const KEY_MONTHLY_REVENUE = 'monthlyRevenue';
export const KEY_AUDITS = 'audits';
export const KEY_HACKS = 'hacks';
export const KEY_FUNDING_ROUNDS = 'fundingRounds';
export const KEY_MAINNET = 'mainNet';
export const KEY_TOKEN = 'token';
export const KEY_ORDER = 'order';
export const KEY_ORDER_BY = 'orderBy';

export const FILTER_CONFIG_KEY_SET = new Set([
  'publicationDate',
  'minSalaryRange',
  'maxSalaryRange',
  'minTeamSize',
  'maxTeamSize',
  'minHeadCount',
  'maxHeadCount',
  'minTvl',
  'maxTvl',
  'minMonthlyVolume',
  'maxMonthlyVolume',
  'minMonthlyFees',
  'maxMonthlyFees',
  'minMonthlyRevenue',
  'maxMonthlyRevenue',
  'minAudits',
  'maxAudits',
  'hacks',
  'fundingRounds',
  'tech',
  'organizations',
  'chains',
  'projects',
  'categories',
  'seniority',
  'locations',
  'mainNet',
  'token',
  'order',
  'orderBy',
]);
