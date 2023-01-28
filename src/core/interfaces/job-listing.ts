import type { Job } from './job';
import type { Org } from './org';
import type { Project } from './project';
import { Repository } from './repository';

/**
 * Job listings are mapped as the main content of the page.
 * It controls all the details on the right-panel.
 * Note:
 * 	- Some job-listings might not expose its project (and competitors along with it).
 * 	- Some orgs might not have public repositories.
 * 	Here are the tabs on the right-panel that might be optional:
 * 		- Project
 * 		- Competitors
 * 		- Repositories
 *  */
export interface JobListing {
  /** All job-related info */
  job: Job;

  /** All org-related info */
  org: Org;

  /** Optional since some project might not expose the project  */
  project: Project | null;

  /** Optional since projects are optional, so are the competitors of a project */
  competitors: Project[] | null;

  /** Optional since some orgs might not expose their repositories */
  repositories: Repository[] | null;
}
