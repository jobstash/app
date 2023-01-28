import type { Tag } from './common';

export interface Org {
  name: string;
  avatar: string;
  location: string;
  teamSize: number;
  fundingDate: string;
  summary: string;
  description: string;
  tags: Tag[];
}
