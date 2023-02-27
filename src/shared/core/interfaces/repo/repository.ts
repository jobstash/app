import type { Tech } from '../common';

export interface Repository {
  id: number;
  name: string;
  description: string;
  project: string;
  type: string;
  committers: number;
  devInfos: DevInfo[];
}

interface DevInfo {
  devCount: number;
  techs: Tech[];
}
