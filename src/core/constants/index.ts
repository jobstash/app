import { capitalize } from '~/utils/capitalize';

export * from './chain';
export * from './org';

// String literals
export const TEXT_DETAILS = 'details';
export const TEXT_ORGANIZATION = 'organization';
export const TEXT_PROJECT = 'project';
export const TEXT_REPOSITORIES = 'repositories';
export const TEXT_COMPETITORS = 'competitors';
export const LABEL_ROLE = 'Role';
export const LABEL_TEAM = 'Team';
export const LABEL_BENEFITS = 'Benefits';
export const LABEL_INTERVIEW = 'Interview Process';

/** Right panel tabs */
export const rightPanelTabs = [
  capitalize(TEXT_DETAILS),
  capitalize(TEXT_ORGANIZATION),
  capitalize(TEXT_PROJECT),
  capitalize(TEXT_REPOSITORIES),
  capitalize(TEXT_COMPETITORS),
] as const;
