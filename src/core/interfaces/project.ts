import type { Chain } from './chain';
import type { Tag } from './tag';
import type { Tech } from './tech';

export interface Project {
  id: number;
  name: string;
  avatar: string;
  description: string;
  numJobs: number;
  numRepos: number;
  website: Tag;
  category: string;
  teamSize: number;
  tvl: string;
  monthlyVolume: string;
  activeUsers: string;
  revenue: string;
  audits: Tag[];
  hacks: Tag[];
  chains: Chain[];
  token: Tag;
  techs: Tech[];
}
