import { Hack } from './common';

export interface Project {
  /** Project unique identifier */
  id: string;

  /** Project display name */
  name: string;

  /** Description section for right-panel */
  description: string;

  /** Url tag for right-panel */
  url: string;

  /** Project display logo */
  logo: string;

  /** Token address */
  tokenAddress?: string; // Refinement: unused

  /** Token tag text */
  tokenSymbol?: string;

  /** Still in construction indicator */
  isInConstruction?: boolean;

  /** Tvl tag text */
  tvl?: number;

  /** Monthly Volume tag text */
  monthlyVolume?: number;

  /** Monthly Fees tag text */
  monthlyFees?: number;

  /** Monthly Revenue tag text */
  monthlyRevenue?: number;

  /** Project created timestamp */
  createdTimestamp: number;

  /** Most recent project timestamp */
  updatedTimestamp?: number; // Refinement: unused

  hacks: Hack[];
  audits: string[];
  chains: string[];

  defillamaId?: string; // Refinement: unused
  defillamaSlug?: string; // Refinement: unused
  defillamaParent?: string; // Refinement: unused
}
