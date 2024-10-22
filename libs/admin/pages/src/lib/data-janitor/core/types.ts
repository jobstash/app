import { OrgItem } from '@jobstash/admin/core';

export type ImportStatus = 'all' | 'pending' | 'stale' | 'done';
export interface ImportItem {
  id: string;
  name: string;
  status: ImportStatus;
  url: string;
  ts: number;
}

export type InputOrgItem = OrgItem & { value: string };
