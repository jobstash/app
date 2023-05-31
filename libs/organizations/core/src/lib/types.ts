import { type Infer } from 'myzod';

import { organizationSchema } from './schemas';

//
// export interface Organization {
//   id: string;
//   orgId: string;
//   name: string;
//   description: string;
//   summary: string;
//   location: string;
//   url: string;

//   github?: string;
//   twitter?: string;
//   jobsiteLink?: string;
//   docs?: string;
//   discord?: string;
//   telegram?: string;
//   linkedin?: string;

//   fundingRounds: FundingRound[];
//   projects: Project[];

//   headcount?: string;

//   // Possibly unused
//   altName?: string;
// }
export type Organization = Infer<typeof organizationSchema>;
