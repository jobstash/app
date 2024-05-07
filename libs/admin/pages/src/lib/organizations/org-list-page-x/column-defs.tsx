import { ColDef, IRowNode, ValueGetterParams } from 'ag-grid-community';
import { CustomCellRendererProps } from 'ag-grid-react';

import { OrgRowItem, URL_DOMAINS, UrlStatus } from '@jobstash/admin/core';

import { JSONEditor } from './json-editor';
import { UrlEditor } from './url-editor';
import { UrlStatusCell } from './url-status-cell';

const getWeight = (statuses: Set<string>, isDescending: boolean): number => {
  if (statuses.has('pending')) {
    return isDescending ? 3 : 1;
  }

  if (statuses.has('dead') || statuses.has('invalid')) {
    return isDescending ? 1 : 3;
  }

  return 2;
};

const urlStatusComparator = (
  valueA: UrlStatus[],
  valueB: UrlStatus[],
  _nodeA: IRowNode<OrgRowItem>,
  _nodeB: IRowNode<OrgRowItem>,
  isDescending: boolean,
  // eslint-disable-next-line max-params
) => {
  const setA = new Set(valueA.flatMap((v) => v.status));
  const setB = new Set(valueB.flatMap((v) => v.status));

  const wA = getWeight(setA, isDescending);
  const wB = getWeight(setB, isDescending);

  console.log({ setA, wA, setB, wB });
  if (wA === wB) return 0;

  return isDescending && wB > wA ? 1 : -1;
};

const defaultUrlStatusDef: Partial<ColDef<OrgRowItem>> = {
  filter: true,
  editable: true,
  cellEditor: UrlEditor,
  cellEditorPopup: true,
  valueParser: (p) => p.newValue,
  suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
  cellRenderer: UrlStatusCell,
  comparator: urlStatusComparator,
};

export const columnDefs: ColDef<OrgRowItem>[] = [
  {
    headerName: 'ID',
    field: 'id',
    filter: true,
  },
  {
    headerName: 'Org ID',
    field: 'orgId',
    filter: true,
    editable: true,
  },
  {
    headerName: 'Name',
    field: 'name',
    filter: true,
    editable: true,
  },
  {
    headerName: 'Website',
    field: 'websiteStatus',
    filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      p.data?.websiteStatus.map((s) => s.url).join(','),
    ...defaultUrlStatusDef,
    //
  },
  {
    ...defaultUrlStatusDef,
    headerName: 'Raw Website',
    field: 'rawWebsiteStatus',
    filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      p.data?.rawWebsiteStatus.map((s) => s.url).join(','),
    comparator: urlStatusComparator,
  },
  {
    ...defaultUrlStatusDef,
    headerName: 'Telegram',
    field: 'telegramStatus',
    filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      p.data?.telegramStatus.map((s) => s.url).join(','),
    cellRenderer: (p: CustomCellRendererProps) => (
      <UrlStatusCell
        newItemKey="telegramStatus"
        domainPrefix={URL_DOMAINS.TELEGRAM}
        {...p}
      />
    ),
    comparator: urlStatusComparator,
  },
  {
    ...defaultUrlStatusDef,
    headerName: 'Github',
    field: 'githubStatus',
    filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      p.data?.githubStatus.map((s) => s.url).join(','),
    cellRenderer: (p: CustomCellRendererProps) => (
      <UrlStatusCell
        newItemKey="githubStatus"
        domainPrefix={URL_DOMAINS.GITHUB}
        {...p}
      />
    ),
    comparator: urlStatusComparator,
  },
  {
    ...defaultUrlStatusDef,
    headerName: 'Twitter',
    field: 'twitterStatus',
    filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      p.data?.twitterStatus.map((s) => s.url).join(','),
    cellRenderer: (p: CustomCellRendererProps) => (
      <UrlStatusCell
        newItemKey="twitterStatus"
        domainPrefix={URL_DOMAINS.TWITTER}
        {...p}
      />
    ),
    comparator: urlStatusComparator,
  },
  {
    ...defaultUrlStatusDef,
    headerName: 'Docs',
    field: 'docsStatus',
    filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      p.data?.docsStatus.map((s) => s.url).join(','),
    comparator: urlStatusComparator,
  },
  {
    headerName: 'Summary',
    field: 'summary',
    filter: true,
    editable: true,
    cellEditor: 'agLargeTextCellEditor',
    cellEditorPopup: true,
  },
  {
    headerName: 'Location',
    field: 'location',
    filter: true,
    editable: true,
  },
  {
    headerName: 'Description',
    field: 'description',
    filter: true,
    editable: true,
    cellEditor: 'agLargeTextCellEditor',
    cellEditorPopup: true,
  },
  {
    headerName: 'Logo URL',
    field: 'logoUrl',
    filter: true,
    editable: true,
  },
  {
    headerName: 'Headcount',
    field: 'headcountEstimate',
    editable: true,
  },
  {
    headerName: 'Created Timestamp',
    field: 'createdTimestamp',
    editable: true,
  },
  {
    headerName: 'Updated Timestamp',
    field: 'updatedTimestamp',
    editable: true,
  },
  {
    headerName: 'Job Count',
    field: 'jobCount',
    editable: true,
  },
  {
    headerName: 'Alias',
    field: 'aliases',
    valueFormatter: (p) => JSON.stringify(p.data?.aliases ?? []),
    valueParser: (p) => p.newValue,
    suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
    filter: true,
    editable: true,
    cellEditor: JSONEditor,
    cellEditorPopup: true,
  },
  {
    headerName: 'Community',
    field: 'community',
    valueFormatter: (p) => JSON.stringify(p.data?.community ?? []),
    valueParser: (p) => p.newValue,
    suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
    filter: true,
    editable: true,
    cellEditor: JSONEditor,
    cellEditorPopup: true,
  },
  {
    headerName: 'Grant',
    field: 'grant',
    valueFormatter: (p) => JSON.stringify(p.data?.grant ?? []),
    valueParser: (p) => p.newValue,
    suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
    filter: true,
    editable: true,
    cellEditor: JSONEditor,
    cellEditorPopup: true,
  },
  {
    headerName: 'Twitter',
    field: 'twitter',
    valueFormatter: (p) => JSON.stringify(p.data?.twitter ?? []),
    valueParser: (p) => p.newValue,
    suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
    filter: true,
    editable: true,
    cellEditor: JSONEditor,
    cellEditorPopup: true,
  },
  {
    headerName: 'Jobsite',
    field: 'jobsite',
    valueFormatter: (p) => JSON.stringify(p.data?.jobsite ?? []),
    valueParser: (p) => p.newValue,
    suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
    filter: true,
    editable: true,
    cellEditor: JSONEditor,
    cellEditorPopup: true,
  },
  {
    headerName: 'Detected Jobsite',
    field: 'detectedJobsite',
    valueFormatter: (p) => JSON.stringify(p.data?.detectedJobsite ?? []),
    valueParser: (p) => p.newValue,
    suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
    filter: true,
    editable: true,
    cellEditor: JSONEditor,
    cellEditorPopup: true,
  },
];
