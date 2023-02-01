import type { Tag } from './tag';
import { Tech } from './tech';

export interface Org {
  name: string;
  avatar: string;
  location: string;
  teamSize: number;
  fundingDate: string;
  summary: string;
  description: string;
  tags: Tag[];

  /** Techs related to an org */
  techs: Tech[];

  /** Most recent date aggregated from org e.g. any activity from org like new job-listing etc */
  recent: string;
}
