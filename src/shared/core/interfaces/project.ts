import { Audit, Category, Chain, Hack } from './common';

//
// export interface Project {
//   isMainnet: boolean;
//   telegram: string;
//   description: string;
//   url: string;
//   orgId: string;
//   twitter: string;
//   discord: string;
//   docs: string;
//   teamSize: number | null;
//   name: string;
//   githubOrganization: string;
//   logo: string;
//   id: string;
//   category?: string;
//   tokenSymbol: null;
//   defiLlamaId?: string;
//   cmcId?: string;
//   tvl?: number;
//   updatedTimestamp?: number;
//   monthlyRevenue?: number;
//   monthlyFees?: number;
//   monthlyVolume?: number;
//   monthlyActiveUsers?: number;
//   chains: string[];
//   hacks: string[];
//   audits: string[];
// }

export interface Project {
  // * Declared correctly
  id: string;
  defiLlamaId?: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  categories: Category[];

  // ? Different from actual data vs interface
  tokenSymbol: null | string; // * -> tokenSymbol?: string

  // ? Not in interface but found on data
  isMainnet: boolean;
  telegram: string;
  orgId: string;
  cmcId?: string;
  twitter: string;
  discord: string;
  docs: string;
  teamSize: null | number;
  githubOrganization: string;
  category: string;

  // ? Declared in interface but not in data
  defiLlamaSlug?: string;
  tokenAddress?: string;
  isInConstruction?: boolean;
  tvl?: number;
  monthlyVolume?: number;
  monthlyFees?: number;
  monthlyRevenue?: number;
  createdTimestamp: number;
  updatedTimestamp?: number;

  // ? Unable to confirm these types as it returns empty array
  chains: Chain[];
  hacks: Hack[];
  audits: Audit[];

  // ? Was this removed?
  monthlyActiveUsers?: number;
}
