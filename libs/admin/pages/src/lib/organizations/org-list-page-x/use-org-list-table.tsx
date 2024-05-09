/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import {
  CellEditingStoppedEvent,
  ColDef,
  GetRowIdFunc,
  IRowNode,
  SelectionChangedEvent,
  ValueFormatterParams,
  ValueGetterParams,
} from 'ag-grid-community';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { useSetAtom } from 'jotai';

import {
  ORG_LIST_UNDO_EVENT,
  OrgRowItem,
  URL_DOMAINS,
  UrlStatus,
} from '@jobstash/admin/core';
import { prefixUrl } from '@jobstash/admin/utils';

import {
  orgListPastaStringAtom,
  orgUpdateRowPayloadAtom,
  useAllOrgs,
} from '@jobstash/admin/state';

import { JSONEditor } from './json-editor';
import { UrlEditor } from './url-editor';
import { UrlStatusCell } from './url-status-cell';

const mapUrlStatus = (urls: string[]): UrlStatus[] =>
  urls.map((url) => ({
    url,
    status: 'pending',
    statusCode: undefined,
  }));

const getStatusWeight = (
  statuses: Set<string>,
  isDescending: boolean,
): number => {
  const weights = {
    pending: isDescending ? 2 : 1,
    alive: 3,
    dead: isDescending ? 1 : 3,
  };

  let highestPriority = isDescending ? 3 : 1;

  for (const status of statuses) {
    if (weights[status as keyof typeof weights] !== undefined) {
      highestPriority = isDescending
        ? Math.min(highestPriority, weights[status as keyof typeof weights])
        : Math.max(highestPriority, weights[status as keyof typeof weights]);
    }
  }

  return highestPriority;
};

const getUrlStatusComparator =
  (
    statusKey:
      | 'websiteStatus'
      | 'rawWebsiteStatus'
      | 'telegramStatus'
      | 'githubStatus'
      | 'discordStatus'
      | 'twitterStatus'
      | 'docsStatus',
  ) =>
  (
    _valueA: UrlStatus[],
    _valueB: UrlStatus[],
    nodeA: IRowNode<OrgRowItem>,
    nodeB: IRowNode<OrgRowItem>,
    isDescending: boolean,
    // eslint-disable-next-line max-params
  ) => {
    const setA = new Set(
      (nodeA.data ? nodeA.data[statusKey] : []).map((v) => v.status),
    );
    const setB = new Set(
      (nodeB.data ? nodeB.data[statusKey] : []).map((v) => v.status),
    );

    const weightA = getStatusWeight(setA, isDescending);
    const weightB = getStatusWeight(setB, isDescending);

    if (weightA === weightB) return 0;
    return weightB - weightA;
  };

export const useOrgListTable = () => {
  const { data } = useAllOrgs();

  const gridRef = useRef<AgGridReact>(null);

  const getRowId: GetRowIdFunc<OrgRowItem> = useCallback(
    ({ data: { id } }) => id,
    [],
  );

  const rowData: OrgRowItem[] | undefined = useMemo(() => {
    if (!data) return;

    return data.map((d) => ({
      ...d,
      websiteStatus: mapUrlStatus(d.website),
      rawWebsiteStatus: mapUrlStatus(d.rawWebsite),
      telegramStatus: mapUrlStatus(d.telegram),
      githubStatus: mapUrlStatus(d.github),
      discordStatus: mapUrlStatus(d.discord),
      twitterStatus: mapUrlStatus(d.twitter),
      docsStatus: mapUrlStatus(d.docs),
    }));
  }, [data]);

  const columnDefs: ColDef<OrgRowItem>[] = useMemo(
    () => [
      {
        headerName: 'ID',
        field: 'id',
        filter: true,
      },
      {
        headerName: 'Org ID',
        field: 'orgId',
        filter: true,
      },
      {
        headerName: 'Name',
        field: 'name',
        filter: true,
        editable: true,
        cellEditor: 'agTextCellEditor',
      },
      {
        headerName: 'Website',
        field: 'websiteStatus',
        valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
          p.data?.websiteStatus.flatMap((s) => s.status).join(',') ?? '',
        filter: true,
        filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
          p.data?.websiteStatus.map((s) => s.url).join(','),
        valueParser: (p) => p.newValue,
        suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
        comparator: getUrlStatusComparator('websiteStatus'),
        cellRenderer: UrlStatusCell,
        editable: true,
        cellEditor: memo(UrlEditor),
        cellEditorPopup: true,
      },
      {
        headerName: 'Raw Website',
        field: 'rawWebsiteStatus',
        valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
          p.data?.rawWebsiteStatus.flatMap((s) => s.status).join(',') ?? '',
        filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
          p.data?.rawWebsiteStatus.map((s) => s.url).join(','),
        comparator: getUrlStatusComparator('rawWebsiteStatus'),
        cellRenderer: (p: CustomCellRendererProps) => (
          <UrlStatusCell {...p} newItemKey="rawWebsiteStatus" />
        ),
      },
      {
        headerName: 'Telegram',
        field: 'telegramStatus',
        valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
          p.data?.telegramStatus.flatMap((s) => s.status).join(',') ?? '',
        filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
          p.data?.telegramStatus.map((s) => s.url).join(','),
        comparator: getUrlStatusComparator('telegramStatus'),
        cellRenderer: (p: CustomCellRendererProps) => (
          <UrlStatusCell
            {...p}
            newItemKey="telegramStatus"
            domainPrefix={URL_DOMAINS.TELEGRAM}
          />
        ),
        editable: true,
        cellEditor: memo(UrlEditor),
        cellEditorPopup: true,
        valueParser: (p) => p.newValue,
      },
      {
        headerName: 'Github',
        field: 'githubStatus',
        valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
          p.data?.githubStatus.flatMap((s) => s.status).join(',') ?? '',
        filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
          p.data?.githubStatus.map((s) => s.url).join(','),
        comparator: getUrlStatusComparator('githubStatus'),
        cellRenderer: (p: CustomCellRendererProps) => (
          <UrlStatusCell
            {...p}
            newItemKey="githubStatus"
            domainPrefix={URL_DOMAINS.GITHUB}
          />
        ),
        editable: true,
        cellEditor: memo(UrlEditor),
        cellEditorPopup: true,
        valueParser: (p) => p.newValue,
      },
      {
        headerName: 'Discord',
        field: 'discordStatus',
        valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
          p.data?.discordStatus.flatMap((s) => s.status).join(',') ?? '',
        filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
          p.data?.discordStatus.map((s) => s.url).join(','),
        comparator: getUrlStatusComparator('discordStatus'),
        cellRenderer: (p: CustomCellRendererProps) => (
          <UrlStatusCell
            {...p}
            newItemKey="discordStatus"
            domainPrefix={URL_DOMAINS.DISCORD}
          />
        ),
        editable: true,
        cellEditor: memo(UrlEditor),
        cellEditorPopup: true,
        valueParser: (p) => p.newValue,
      },
      {
        headerName: 'Twitter',
        field: 'twitterStatus',
        valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
          p.data?.twitterStatus.flatMap((s) => s.status).join(',') ?? '',
        filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
          p.data?.twitterStatus.map((s) => s.url).join(','),
        comparator: getUrlStatusComparator('twitterStatus'),
        cellRenderer: (p: CustomCellRendererProps) => (
          <UrlStatusCell
            {...p}
            newItemKey="twitterStatus"
            domainPrefix={URL_DOMAINS.TWITTER}
          />
        ),
        editable: true,
        cellEditor: memo(UrlEditor),
        cellEditorPopup: true,
        valueParser: (p) => p.newValue,
      },
      {
        headerName: 'Docs',
        field: 'docsStatus',
        valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
          p.data?.docsStatus.flatMap((s) => s.status).join(',') ?? '',
        filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
          p.data?.docsStatus.map((s) => s.url).join(','),
        comparator: getUrlStatusComparator('docsStatus'),
        cellRenderer: (p: CustomCellRendererProps) => (
          <UrlStatusCell {...p} newItemKey="docsStatus" />
        ),
        editable: true,
        cellEditor: memo(UrlEditor),
        cellEditorPopup: true,
        valueParser: (p) => p.newValue,
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
        cellEditor: 'agTextCellEditor',
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
        headerName: 'Job Count',
        field: 'jobCount',
      },
      {
        headerName: 'Open Engineering Jobs',
        field: 'openEngineeringJobCount',
      },
      {
        headerName: 'Total Engineering Jobs',
        field: 'totalEngineeringJobCount',
      },
      {
        headerName: 'Logo URL',
        field: 'logoUrl',
        filter: true,
        editable: true,
        cellEditor: 'agTextCellEditor',
      },
      {
        headerName: 'Headcount',
        field: 'headcountEstimate',
        editable: true,
        cellEditor: 'agNumberCellEditor',
      },
      {
        headerName: 'Created Timestamp',
        field: 'createdTimestamp',
      },
      {
        headerName: 'Updated Timestamp',
        field: 'updatedTimestamp',
      },
      {
        headerName: 'Projects',
        field: 'projects',
        valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
          p.data!.projects.map((p) => p.id).join(', '),
        valueParser: (p) => p.newValue,
        suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
        filter: true,
        // TODO: Make this editable
        // editable: true,
        // cellEditor: JSONEditor,
        // cellEditorPopup: true,
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
        headerName: 'Jobsite',
        field: 'jobsite',
        valueFormatter: (p) => JSON.stringify(p.data?.jobsite ?? []),
        valueParser: (p) => p.newValue,
        suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
        filter: true,
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
        cellEditor: JSONEditor,
        cellEditorPopup: true,
      },
    ],
    [],
  );

  const setPastaString = useSetAtom(orgListPastaStringAtom);
  const onSelectionChanged = useCallback(
    (e: SelectionChangedEvent<OrgRowItem>) => {
      setPastaString(
        e.api
          .getSelectedNodes()
          .map((node) => {
            const {
              id,
              orgId,
              name,
              location,
              summary,
              description,
              logoUrl,
              headcountEstimate,
              createdTimestamp,
              updatedTimestamp,
              jobCount,
              discord,
              website,
              rawWebsite,
              telegram,
              github,
              aliases,
              grant,
              twitter,
              docs,
              community,
              jobsite,
              detectedJobsite,
            } = node.data!;

            return [
              id,
              orgId,
              name,
              location,
              summary,
              description,
              logoUrl,
              headcountEstimate,
              createdTimestamp,
              updatedTimestamp,
              jobCount,
              discord,
              grant,
              aliases,
              community,
              prefixUrl(website),
              prefixUrl(rawWebsite),
              prefixUrl(telegram, URL_DOMAINS.TELEGRAM),
              prefixUrl(github, URL_DOMAINS.GITHUB),
              prefixUrl(twitter, URL_DOMAINS.TWITTER),
              prefixUrl(docs),
              JSON.stringify(jobsite),
              JSON.stringify(detectedJobsite),
            ].join('\t');
          })
          .join('\n'),
      );
    },
    [setPastaString],
  );

  const setRowPayload = useSetAtom(orgUpdateRowPayloadAtom);
  const onCellEditingStopped = useCallback(
    (e: CellEditingStoppedEvent<OrgRowItem>) => {
      const {
        node: { rowIndex, data },
        oldValue,
        newValue,
      } = e;

      const valueChanged =
        JSON.stringify(oldValue) !== JSON.stringify(newValue);

      const isStringValue =
        typeof oldValue === 'string' || typeof newValue === 'string';
      const hasValue = isStringValue ? valueChanged : Boolean(newValue);

      if (data && valueChanged && rowIndex !== null && hasValue) {
        // Using mutation directly here triggers a rerender on the table
        // which reverts the edited cell to its original value
        // hence syncing it externally
        setRowPayload(data);
      }
    },

    [setRowPayload],
  );

  // Handle revert edit
  useEffect(() => {
    const handleUndoEvent: EventListener = () => {
      gridRef.current!.api.undoCellEditing();
    };

    window.addEventListener(ORG_LIST_UNDO_EVENT, handleUndoEvent);

    return () => {
      window.removeEventListener(ORG_LIST_UNDO_EVENT, handleUndoEvent);
    };
  }, []);

  return {
    gridRef,
    rowData,
    columnDefs,
    getRowId,
    onSelectionChanged,
    onCellEditingStopped,
  };
};
