import { OrgItem } from '@jobstash/admin/core';

export type OrgImportStatus = 'all' | 'pending' | 'stale' | 'done';
export interface OrgImportItem {
  id: string;
  name: string;
  status: OrgImportStatus;
  url: string;
  ts: number;
}

export type InputOrgItem = OrgItem & { value: string };
