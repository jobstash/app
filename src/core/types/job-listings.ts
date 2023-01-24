import type { MinMax } from './common';

export interface Job {
  id: number; // ??? need backend info
  title: string;
  role: string;
  salary: MinMax;
  strat: string;
  teamSize: number;
  tz: string;
  created: string; // ??? backend formatted?
  tags: { name: string; isChecked: boolean }[];
  companyId: number; // ?? need backend info
}

export interface Company {
  id: number; // ??? need backend info
  name: string;
  avatar: string;
  location: string;
  teamSize: MinMax;
  dateFunding: string; // ??? backend formatted?
  description: string;
  tags: string[];

  /** List of developers related to company (avatar url array for now) */
  developers: string[];

  /** Company id of competitors */
  competitors: number[];
}

export interface JobListingsQuery {
  /** All (page-limit) available jobs */
  jobs: Job[];

  /** List of companies involved */
  companies: Company[];

  /** Provide total count incase we use pagination */
  totalCount: number; // ??? need backend info
}
