export interface Project {
  id: string;

  defiLlamaId?: string;
  defiLlamaSlug?: string;
  defiLlamaParent?: string;

  name: string;
  description: string;
  url: string;
  logo: string;

  githubOrganization?: string;
  twitter?: string;
  discord?: string;
  docs?: string;
  telegram?: string;
  teamSize?: number;

  isMainNet: boolean;
  tokenAddress?: string;
  tokenSymbol?: string;

  isInConstruction?: boolean;

  tvl?: number;
  monthlyVolume?: number;
  monthlyActiveUsers?: number;
  monthlyFees?: number;
  monthlyRevenue?: number;

  createdTimestamp: number;

  updatedTimestamp?: number;
  category?: string;

  //
  // hacks: Hack[];
  // audits: string[];
  // chains: string[];
}
