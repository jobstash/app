export interface Competitor {
  defillamaSlug: string;
  isMainnet: boolean; // Values from middleware are true / "TRUE"
  tokenSymbol: string;
  createdTimestamp: number;
  telegram?: string;
  defillamaId: string;
  description: string;
  updatedTimestamp: number;
  orgId?: string;
  url: string;
  tokenAddress?: string;
  defiLlamaId?: string;
  twitter?: string;
  discord?: string;
  docs?: string;
  teamSize?: string;
  name: string;
  githubOrganization?: string;
  logo: string;
  id: string;
  category?: string;
  tvl?: number;
  defillamaParent?: string;
  monthlyVolume?: number;
  monthlyRevenue?: number;
  monthlyFees?: number;
}
