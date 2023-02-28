export interface Job {
  /** Each job-post has an id */
  id: string;

  /** Title for job-post card */
  jobTitle: string;

  // Timestamp for job-post card
  jobCreatedTimestamp: number; // Refinement: receive formatted string
  jobFoundTimestamp: number; // Refinement: unused
  extractedTimestamp: number; // Refinement: unused

  /** Seniority tag for job-post card */
  seniority?: string; // Refinement: receive formatted string, must be required

  // Salaries
  minSalaryRange: number; // Refinement: receive formatted string
  maxSalaryRange: number; // Refinement: receive formatted string

  /** Location tag for job-post card */
  jobLocation: string;

  /** Commitment tag for job-post card */
  jobCommitment: string;

  /** Apply button for right-panel */
  jobApplyPageUrl: string;
  jobPageUrl: string; // Refinement: unused

  /** Role section for right-panel */
  role: string;

  /** Team section for right-panel */
  team: string;

  /** Benefits section for right-panel */
  benefits: string;

  /** Culture section for right-panel */
  culture: string;

  /** Hard sklls to be displayed */
  hardSkills: string[];
}
