import type { Skill, Tag } from './common';

interface DevInfo {
  /** How many devs working on a set of skills */
  devCount: number;
  /** Set of skills described by dev-count */
  skills: Skill[];
}

/** Repositories exposed by an org */
export interface Repository {
  /** Repository name */
  name: string;
  /** Repository host e.g. Github, Gitlab, etc */
  host: string;
  /** Tags enumerated as info in details */
  tags: Tag[];
  /** Provides info about devs (and their skills) working on a repo */
  devInfo: DevInfo;
}
