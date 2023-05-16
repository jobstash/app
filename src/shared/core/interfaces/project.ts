export interface Project {
  isMainnet: boolean;
  telegram: string;
  description: string;
  url: string;
  orgId: string;
  twitter: string;
  discord: string;
  docs: string;
  teamSize: number | null;
  name: string;
  githubOrganization: string;
  logo: string;
  id: string;
  category?: string;
  tokenSymbol: null;
  defiLlamaId?: string;
  cmcId?: string;
  tvl?: number;
  updatedTimestamp?: number;
  monthlyRevenue?: number;
  monthlyFees?: number;
  monthlyVolume?: number;
  monthlyActiveUsers?: number;
  chains: string[];
  hacks: string[];
  audits: string[];
}
