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
import {
  AgGridReact,
  CustomCellEditorProps,
  CustomCellRendererProps,
} from 'ag-grid-react';
import { useSetAtom } from 'jotai';

import {
  ORG_LIST_UNDO_EVENT,
  OrgRowItem,
  URL_DOMAINS,
  UrlStatus,
} from '@jobstash/admin/core';
import { prefixUrl } from '@jobstash/admin/utils';

import {
  orgEditRowPayloadAtom,
  orgListPastaStringAtom,
  useAllOrgs,
} from '@jobstash/admin/state';

import { AvatarCell } from './avatar-cell';
import { JobsiteEditor } from './jobsite-editor';
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
      | 'docsStatus'
      | 'jobsiteStatus'
      | 'detectedJobsiteStatus',
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
      jobsiteStatus: mapUrlStatus(d.jobsite.flatMap((j) => j.url)),
      detectedJobsiteStatus: mapUrlStatus(
        d.detectedJobsite.flatMap((j) => j.url),
      ),
    }));
  }, [data]);

  const columnDefs: ColDef<OrgRowItem>[] = useMemo(
    () => [
      // {
      //   checkboxSelection: true,
      //   headerName: 'ID',
      //   field: 'id',
      //   filter: true,
      // },
      // {
      //   headerName: 'Org ID',
      //   field: 'orgId',
      //   filter: true,
      // },
      // {
      //   headerName: 'Avatar',
      //   width: 100,
      //   cellRenderer: AvatarCell,
      // },
      {
        headerName: 'Name',
        field: 'name',
        filter: true,
        editable: true,
        cellEditor: 'agTextCellEditor',
      },
      // {
      //   headerName: 'Logo URL',
      //   field: 'logoUrl',
      //   filter: true,
      //   editable: true,
      //   cellEditor: 'agTextCellEditor',
      // },
      // {
      //   headerName: 'Website',
      //   field: 'websiteStatus',
      //   valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
      //     p.data?.websiteStatus.flatMap((s) => s.status).join(',') ?? '',
      //   filter: true,
      //   filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      //     p.data?.websiteStatus.map((s) => s.url).join(','),
      //   valueParser: (p) => p.newValue,
      //   suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
      //   comparator: getUrlStatusComparator('websiteStatus'),
      //   cellRenderer: UrlStatusCell,
      //   editable: true,
      //   cellEditor: memo(UrlEditor),
      //   cellEditorPopup: true,
      // },
      // {
      //   headerName: 'Raw Website',
      //   field: 'rawWebsiteStatus',
      //   valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
      //     p.data?.rawWebsiteStatus.flatMap((s) => s.status).join(',') ?? '',
      //   filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      //     p.data?.rawWebsiteStatus.map((s) => s.url).join(','),
      //   comparator: getUrlStatusComparator('rawWebsiteStatus'),
      //   cellRenderer: (p: CustomCellRendererProps) => (
      //     <UrlStatusCell {...p} newItemKey="rawWebsiteStatus" />
      //   ),
      // },
      // {
      //   headerName: 'Telegram',
      //   field: 'telegramStatus',
      //   valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
      //     p.data?.telegramStatus.flatMap((s) => s.status).join(',') ?? '',
      //   filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      //     p.data?.telegramStatus.map((s) => s.url).join(','),
      //   comparator: getUrlStatusComparator('telegramStatus'),
      //   cellRenderer: (p: CustomCellRendererProps) => (
      //     <UrlStatusCell
      //       {...p}
      //       newItemKey="telegramStatus"
      //       domainPrefix={URL_DOMAINS.TELEGRAM}
      //     />
      //   ),
      //   editable: true,
      //   cellEditor: memo(UrlEditor),
      //   cellEditorPopup: true,
      //   valueParser: (p) => p.newValue,
      // },
      // {
      //   headerName: 'Github',
      //   field: 'githubStatus',
      //   valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
      //     p.data?.githubStatus.flatMap((s) => s.status).join(',') ?? '',
      //   filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      //     p.data?.githubStatus.map((s) => s.url).join(','),
      //   comparator: getUrlStatusComparator('githubStatus'),
      //   cellRenderer: (p: CustomCellRendererProps) => (
      //     <UrlStatusCell
      //       {...p}
      //       newItemKey="githubStatus"
      //       domainPrefix={URL_DOMAINS.GITHUB}
      //     />
      //   ),
      //   editable: true,
      //   cellEditor: memo(UrlEditor),
      //   cellEditorPopup: true,
      //   valueParser: (p) => p.newValue,
      // },
      // {
      //   headerName: 'Discord',
      //   field: 'discordStatus',
      //   valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
      //     p.data?.discordStatus.flatMap((s) => s.status).join(',') ?? '',
      //   filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      //     p.data?.discordStatus.map((s) => s.url).join(','),
      //   comparator: getUrlStatusComparator('discordStatus'),
      //   cellRenderer: (p: CustomCellRendererProps) => (
      //     <UrlStatusCell
      //       {...p}
      //       newItemKey="discordStatus"
      //       domainPrefix={URL_DOMAINS.DISCORD}
      //     />
      //   ),
      //   editable: true,
      //   cellEditor: memo(UrlEditor),
      //   cellEditorPopup: true,
      //   valueParser: (p) => p.newValue,
      // },
      // {
      //   headerName: 'Twitter',
      //   field: 'twitterStatus',
      //   valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
      //     p.data?.twitterStatus.flatMap((s) => s.status).join(',') ?? '',
      //   filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      //     p.data?.twitterStatus.map((s) => s.url).join(','),
      //   comparator: getUrlStatusComparator('twitterStatus'),
      //   cellRenderer: (p: CustomCellRendererProps) => (
      //     <UrlStatusCell
      //       {...p}
      //       newItemKey="twitterStatus"
      //       domainPrefix={URL_DOMAINS.TWITTER}
      //     />
      //   ),
      //   editable: true,
      //   cellEditor: memo(UrlEditor),
      //   cellEditorPopup: true,
      //   valueParser: (p) => p.newValue,
      // },
      // {
      //   headerName: 'Docs',
      //   field: 'docsStatus',
      //   valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
      //     p.data?.docsStatus.flatMap((s) => s.status).join(',') ?? '',
      //   filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
      //     p.data?.docsStatus.map((s) => s.url).join(','),
      //   comparator: getUrlStatusComparator('docsStatus'),
      //   cellRenderer: (p: CustomCellRendererProps) => (
      //     <UrlStatusCell {...p} newItemKey="docsStatus" />
      //   ),
      //   editable: true,
      //   cellEditor: memo(UrlEditor),
      //   cellEditorPopup: true,
      //   valueParser: (p) => p.newValue,
      // },
      // {
      //   headerName: 'Location',
      //   field: 'location',
      //   filter: true,
      //   editable: true,
      //   cellEditor: 'agTextCellEditor',
      // },
      // {
      //   headerName: 'Summary',
      //   field: 'summary',
      //   filter: true,
      //   editable: true,
      //   cellEditor: 'agLargeTextCellEditor',
      //   cellEditorPopup: true,
      // },
      // {
      //   headerName: 'Description',
      //   field: 'description',
      //   filter: true,
      //   editable: true,
      //   cellEditor: 'agLargeTextCellEditor',
      //   cellEditorPopup: true,
      // },
      // {
      //   headerName: 'Job Count',
      //   field: 'jobCount',
      // },
      // {
      //   headerName: 'Open Engineering Jobs',
      //   field: 'openEngineeringJobCount',
      // },
      // {
      //   headerName: 'Total Engineering Jobs',
      //   field: 'totalEngineeringJobCount',
      // },
      // {
      //   headerName: 'Headcount',
      //   field: 'headcountEstimate',
      //   editable: true,
      //   cellEditor: 'agNumberCellEditor',
      // },
      // {
      //   headerName: 'Created Timestamp',
      //   field: 'createdTimestamp',
      // },
      // {
      //   headerName: 'Updated Timestamp',
      //   field: 'updatedTimestamp',
      // },
      // {
      //   headerName: 'Projects',
      //   field: 'projects',
      //   valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
      //     p.data!.projects.map((p) => p.name).join(', '),
      //   valueParser: (p) => p.newValue,
      //   suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
      //   filter: true,
      //   // TODO: Make this editable (only accepts id)
      //   // editable: true,
      //   // cellEditor: JSONEditor,
      //   // cellEditorPopup: true,
      // },
      // {
      //   headerName: 'Alias',
      //   field: 'aliases',
      //   valueFormatter: (p) => (p.data?.aliases ?? []).join(', '),
      //   valueParser: (p) => p.newValue,
      //   suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
      //   filter: true,
      //   editable: true,
      //   cellEditor: JSONEditor,
      //   cellEditorPopup: true,
      // },
      // {
      //   headerName: 'Community',
      //   field: 'community',
      //   valueFormatter: (p) => (p.data?.community ?? []).join(', '),
      //   valueParser: (p) => p.newValue,
      //   suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
      //   filter: true,
      //   editable: true,
      //   cellEditor: JSONEditor,
      //   cellEditorPopup: true,
      // },
      // {
      //   headerName: 'Grant',
      //   field: 'grant',
      //   valueFormatter: (p) => (p.data?.grant ?? []).join(', '),
      //   valueParser: (p) => p.newValue,
      //   suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
      //   filter: true,
      //   editable: true,
      //   cellEditor: JSONEditor,
      //   cellEditorPopup: true,
      // },
      {
        headerName: 'Jobsite Url',
        field: 'jobsiteStatus',
        valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
          p.data?.jobsiteStatus.flatMap((s) => s.status).join(',') ?? '',
        filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
          p.data?.jobsiteStatus.map((s) => s.url).join(','),
        comparator: getUrlStatusComparator('jobsiteStatus'),
        cellRenderer: (p: CustomCellRendererProps) => (
          <UrlStatusCell {...p} newItemKey="jobsiteStatus" />
        ),
        valueParser: (p) => p.newValue,
        editable: true,
        cellEditor: (p: CustomCellEditorProps<OrgRowItem>) => (
          <JobsiteEditor rowKey="jobsite" {...p} />
        ),
        cellEditorPopup: true,
      },
      {
        headerName: 'Jobsite Type',
        valueGetter: (p: ValueGetterParams<OrgRowItem>) =>
          p.data?.jobsite.flatMap((j) => j.type).join(', '),
        valueFormatter: (p) =>
          (p.data?.jobsite ?? []).map((j) => j.type).join(', '),
        filter: true,
      },
      {
        headerName: 'Detected Jobsite Url',
        field: 'detectedJobsiteStatus',
        valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
          p.data?.detectedJobsiteStatus.flatMap((s) => s.status).join(',') ??
          '',
        filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
          p.data?.detectedJobsiteStatus.map((s) => s.url).join(','),
        comparator: getUrlStatusComparator('detectedJobsiteStatus'),
        cellRenderer: (p: CustomCellRendererProps) => (
          <UrlStatusCell {...p} newItemKey="detectedJobsiteStatus" />
        ),
        valueParser: (p) => p.newValue,
      },
      {
        headerName: 'Detected Jobsite Type',
        valueGetter: (p: ValueGetterParams<OrgRowItem>) =>
          p.data?.detectedJobsite.flatMap((j) => j.type).join(', '),
        valueFormatter: (p) =>
          (p.data?.detectedJobsite ?? []).map((j) => j.type).join(', '),
        filter: true,
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
              logoUrl,
              website,
              rawWebsite,
              telegram,
              github,
              discord,
              twitter,
              docs,
              location,
              summary,
              description,
              jobCount,
              openEngineeringJobCount,
              totalEngineeringJobCount,
              headcountEstimate,
              createdTimestamp,
              updatedTimestamp,
              projects,
              aliases,
              community,
              grant,
              jobsite,
              detectedJobsite,
            } = node.data!;

            return [
              id,
              orgId,
              name,
              logoUrl,
              prefixUrl(website),
              prefixUrl(rawWebsite),
              prefixUrl(telegram, URL_DOMAINS.TELEGRAM),
              prefixUrl(github, URL_DOMAINS.GITHUB),
              prefixUrl(discord, URL_DOMAINS.DISCORD),
              prefixUrl(twitter, URL_DOMAINS.TWITTER),
              prefixUrl(docs),
              location,
              summary,
              description,
              jobCount,
              openEngineeringJobCount,
              totalEngineeringJobCount,
              headcountEstimate,
              createdTimestamp,
              updatedTimestamp,
              projects.flatMap((p) => p.name),
              aliases,
              community,
              grant,
              jobsite.flatMap((j) => j.url),
              jobsite.flatMap((j) => j.type),
              detectedJobsite.flatMap((j) => j.url),
              detectedJobsite.flatMap((j) => j.type),
            ].join('\t');
          })
          .join('\n'),
      );
    },
    [setPastaString],
  );

  const setRowPayload = useSetAtom(orgEditRowPayloadAtom);
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

      const isJobsitePayload =
        Array.isArray(newValue) &&
        newValue.length > 0 &&
        typeof newValue[0] === 'object' &&
        'url' in newValue[0] &&
        'status' in newValue[0];

      if (
        data &&
        valueChanged &&
        rowIndex !== null &&
        hasValue &&
        !isJobsitePayload
      ) {
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
