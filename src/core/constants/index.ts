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
export const LABEL_DETAILS = capitalize(TEXT_DETAILS);
export const LABEL_ORGANIZATION = capitalize(TEXT_ORGANIZATION);
export const LABEL_PROJECT = capitalize(TEXT_PROJECT);
export const LABEL_REPOSITORIES = capitalize(TEXT_REPOSITORIES);
export const LABEL_COMPETITORS = capitalize(TEXT_COMPETITORS);
export const EVENT_CARD_CLICK = 'card-click';

// Attributes
export const ID_TOP_RIGHT_PANEL = 'top-right-panel';

/** Right panel tabs */
export const rightPanelTabs = [
  LABEL_DETAILS,
  LABEL_ORGANIZATION,
  LABEL_PROJECT,
  LABEL_COMPETITORS,
  LABEL_REPOSITORIES,
] as const;
