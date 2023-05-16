export interface JobPost {
  id: string;
  benefits: null | string;
  extractedTimestamp: number;
  role: null | string;
  offersTokenAllocation?: boolean;
  jobTitle: string;
  salaryCurrency?: string;
  shortUUID: string;
  jobCreatedTimestamp: number;
  team: null | string;
  aiDetectedTechnologies: string;
  jobLocation: string;
  culture: null | string;
  jobFoundTimestamp: number;
  jobPageUrl: string;
  jobApplyPageUrl: string;
  maxSalaryRange?: number;
  medianSalary?: number;
  seniority: string;
  minSalaryRange?: number;
  jobCommitment: null | string;
  paysInCrypto?: boolean;
}
