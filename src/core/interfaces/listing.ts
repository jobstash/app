import type { MouseEventHandler } from 'react';

import type { Job } from './job';
import type { Org } from './org';
import type { Project } from './project';
import type { Repository } from './repository';

/**
 * Listing represents the interface for cards listed on main-panel (center)
 * It contains all data needed both on main and right panels.
 * Note:
 * 	- some listings might not expose projects (and competitors along with it)
 * 	- some listings might not have public repos
 * Optional tabs: `Jobs`, `Project`, `Competitors`, `Jobs`
 * */
export interface Listing {
  /** All org-related info */
  readonly org: Org;

  /**
   * All job-related info.
   * `/jobs` route contains exactly one element
   * Optional since some repos/project might have no job openings
   * */
  readonly jobs: Job[];

  /** Optional since some projects might not be exposed  */
  readonly projects: Project[];

  /** Optional since projects are optional, so are the competitors of a project */
  readonly competitors: Project[];

  /** Optional since some orgs might not expose their repositories */
  readonly repositories: Repository[];
}

/** All listing ui (e.g. jobs, orgs, etc) should conform this props interface */
export interface ListingProps {
  listing: Listing;
  isActive: boolean;
  onClick: MouseEventHandler;
}
