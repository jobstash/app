export interface JobPost {
  id: string;
  shortUUID: string;
  minSalaryRange?: number;
  maxSalaryRange?: number;
  medianSalary?: number;
  seniority?: string;
  role: null | string;
  team: null | string;
  benefits: null | string;
  culture: null | string;
  salaryCurrency?: string;
  paysInCrypto?: boolean;
  offersTokenAllocation?: boolean;
  jobApplyPageUrl: string;
  jobCommitment: null | string;
  jobCreatedTimestamp: number;
  jobPageUrl: string;
  jobLocation: string;
  jobTitle: string;

  jobFoundTimestamp: number;
  extractedTimestamp: number;
  aiDetectedTechnologies: string;
}
