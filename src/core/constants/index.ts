export * from './chain';
export * from './org';
export * from './tag';

// String literals
export const LABEL_ROLE = 'Role';
export const LABEL_TEAM = 'Team';
export const LABEL_BENEFITS = 'Benefits';
export const LABEL_INTERVIEW = 'Interview Process';
export const LABEL_DETAILS = 'Details';
export const LABEL_JOBS = 'Jobs';
export const LABEL_ORGANIZATION = 'Organization';
export const LABEL_PROJECTS = 'Projects';
export const LABEL_REPOSITORIES = 'Repositories';
export const LABEL_COMPETITORS = 'Competitors';
export const EVENT_CARD_CLICK = 'card-click';

// Attributes
export const ID_TOP_RIGHT_PANEL = 'top-right-panel';

/** Right panel tabs */
export const rightPanelTabs = [
  LABEL_DETAILS,
  LABEL_ORGANIZATION,
  LABEL_JOBS,
  LABEL_PROJECTS,
  LABEL_COMPETITORS,
  LABEL_REPOSITORIES,
] as const;
