import { Jobsite } from '@jobstash/shared/core';

import { OrgItem } from './schemas';

export type ImportStatus = 'all' | 'pending' | 'stale' | 'done';
export interface ImportItem {
  id: string;
  name: string;
  status: ImportStatus;
  url: string;
  ts: number;
}

export type InputOrgItem = OrgItem & { value: string };

export type OnChangeJobsite = (
  key: 'jobsites' | 'detectedJobsites',
  updatedJobsite: Jobsite,
  op?: 'create' | 'update' | 'delete',
) => void;
