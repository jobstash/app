import { Audit, Category, Chain, Hack } from './common';
export interface Project {
  id: string;
  defiLlamaId?: string;
  defiLlamaSlug?: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  createdTimestamp: number;

  tokenAddress?: string;
  tokenSymbol?: string;

  tvl?: number;
  monthlyVolume?: number;
  monthlyFees?: number;
  monthlyActiveUsers?: number;
  monthlyRevenue?: number;
  teamSize: null | number;
  category: string;

  isInConstruction?: boolean;
  isMainnet: boolean;

  telegram?: string;
  twitter?: string;
  discord?: string;
  githubOrganization?: string;

  categories: Category[];

  chains: Chain[];
  hacks: Hack[];
  audits: Audit[];

  // Possibly unused
  orgId: string;
  docs: string;
  updatedTimestamp?: number;
}
