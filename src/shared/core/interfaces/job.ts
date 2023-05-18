//
// export interface JobPost {
//   id: string;
//   shortUUID: string;
//   benefits: null | string;
//   extractedTimestamp: number;
//   role: null | string;
//   offersTokenAllocation?: boolean;
//   jobTitle: string;
//   salaryCurrency?: string;
//   jobCreatedTimestamp: number;
//   team: null | string;
//   aiDetectedTechnologies: string;
//   jobLocation: string;
//   culture: null | string;
//   jobFoundTimestamp: number;
//   jobPageUrl: string;
//   jobApplyPageUrl: string;
//   maxSalaryRange?: number;
//   medianSalary?: number;
//   seniority: string;
//   minSalaryRange?: number;
//   jobCommitment: null | string;
//   paysInCrypto?: boolean;
// }

export interface JobPost {
  // * Declared correctly
  id: string;
  shortUUID: string;
  seniority: string;
  jobApplyPageUrl: string;
  jobCreatedTimestamp: number;
  jobFoundTimestamp: number;
  jobPageUrl: string;
  jobLocation: string;
  jobTitle: string;
  aiDetectedTechnologies: string;
  extractedTimestamp: number;

  // ? Different from actual data vs interface
  minSalaryRange?: number; // * -> minSalaryRange: number
  maxSalaryRange?: number; // * -> maxSalaryRange: number
  role: null | string; // * -> role: string
  team: null | string; // * -> team: string
  benefits: null | string; // * -> benefits: string
  culture: null | string; // * -> culture: string
  salaryCurrency?: string; // * -> salaryCurrency: string
  paysInCrypto?: boolean; // * -> paysInCrypto: boolean
  offersTokenAllocation?: boolean; // * -> offersTokenAllocation: boolean
  jobCommitment: null | string; // * -> jobCommitment?: string

  // ? Not in interface
  medianSalary?: number;
}
