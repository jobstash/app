import { Infer } from 'myzod';

import { projectSchema } from './schemas';

//
// export interface Project {
//   id: string;
//   defiLlamaId?: string;
//   defiLlamaSlug?: string;
//   name: string;
//   description: string;
//   url: string;
//   logo: string;
//   createdTimestamp: number;

//   TokenAddress?: string;
//   tokenSymbol?: string;

//   tvl?: number;
//   monthlyVolume?: number;
//   monthlyFees?: number;
//   monthlyActiveUsers?: number;
//   monthlyRevenue?: number;
//   teamSize: null | number;
//   category: string;

//   isInConstruction?: boolean;
//   isMainnet: boolean;

//   telegram?: string;
//   twitter?: string;
//   discord?: string;
//   githubOrganization?: string;

//   categories: Category[];
//   chains: Chain[];
//   hacks: Hack[];
//   audits: Audit[];

//   orgId: string;
//   docs: string;
//   updatedTimestamp?: number;
// }
export type Project = Infer<typeof projectSchema>;
