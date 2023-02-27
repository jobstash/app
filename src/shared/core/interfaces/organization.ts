export interface Organization {
  /** Org unique identifier */
  id: string;

  /** Org id numstr */
  orgId: string; // Refinement: unused

  /** Org display name */
  name: string;

  /** Description text for right-panel-header */
  description: string;

  /** Summary text for right-panel-header */
  summary: string;

  /** Url tag for right-panel-header */
  url: string;

  /** Location tag for right-panel-header */
  location: string;

  /** Timestamp for org */
  createdTimestamp: number;

  /** Most recent timestamp related to org */
  updatedTimestamp?: number;

  /** Github org display text */
  githubOrganization: string;

  /** Team size tag text */
  teamSize?: string;

  /** Twitter tag text */
  twitter?: string;

  /** Discord tag text */
  discord?: string;

  /** Linkedin tag text */
  linkedin?: string;

  /** Telegram tag text */
  telegram?: string;
}
