import type { Tag } from './tag';
import { Tech } from './tech';

interface DevInfo {
  /** How many devs working on a set of techs */
  devCount: number;
  /** Set of techs described by dev-count */
  techs: Tech[];
}

interface OrgInfo {
  name: string;
  avatar: string;
}

/** Repositories exposed by an org */
export interface Repository {
  /** Repository name */
  name: string;
  /** Repository description */
  desc: string;
  /** Tags enumerated as info in details */
  tags: Tag[];
  /** Provides info about devs (and their techs) working on a repo */
  devInfos: DevInfo[];

  /** Org related to repo */
  orgInfo: OrgInfo;

  /** Tech skills related to repo */
  techs: Tech[];

  /** Most recent date aggregated from org e.g. any activity from repo like new job-listing etc */
  recent: string;
}
