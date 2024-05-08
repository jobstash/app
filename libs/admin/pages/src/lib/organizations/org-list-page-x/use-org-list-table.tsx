/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { memo, useCallback, useMemo, useRef } from 'react';

import {
  ColDef,
  GetRowIdFunc,
  IRowNode,
  SelectionChangedEvent,
  ValueFormatterParams,
  ValueGetterParams,
} from 'ag-grid-community';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { useSetAtom } from 'jotai';

import { OrgRowItem, URL_DOMAINS, UrlStatus } from '@jobstash/admin/core';
import { prefixUrl } from '@jobstash/admin/utils';

import { orgListPastaStringAtom, useAllOrgs } from '@jobstash/admin/state';

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

// TODO: use node in retrieving current data
// TODO: add the key for comparator

const getUrlStatusComparator =
  (
    statusKey:
      | 'websiteStatus'
      | 'rawWebsiteStatus'
      | 'telegramStatus'
      | 'githubStatus'
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
      },
      {
        headerName: 'Website',
        field: 'websiteStatus',
        valueFormatter: (p: ValueFormatterParams<OrgRowItem, string>) =>
          p.data?.websiteStatus.flatMap((s) => s.status).join(',') ?? '',
        filter: true,
        filterValueGetter: (p: ValueGetterParams<OrgRowItem, string>) =>
          p.data?.websiteStatus.map((s) => s.url).join(','),
        cellEditor: memo(UrlEditor),
        cellEditorPopup: true,
        valueParser: (p) => p.newValue,
        suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
        comparator: getUrlStatusComparator('websiteStatus'),
        cellRenderer: UrlStatusCell,
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
      },
      {
        headerName: 'Summary',
        field: 'summary',
        filter: true,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorPopup: true,
      },
      {
        headerName: 'Location',
        field: 'location',
        filter: true,
      },
      {
        headerName: 'Description',
        field: 'description',
        filter: true,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorPopup: true,
      },
      {
        headerName: 'Logo URL',
        field: 'logoUrl',
        filter: true,
      },
      {
        headerName: 'Headcount',
        field: 'headcountEstimate',
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
        headerName: 'Job Count',
        field: 'jobCount',
      },
      {
        headerName: 'Alias',
        field: 'aliases',
        valueFormatter: (p) => JSON.stringify(p.data?.aliases ?? []),
        valueParser: (p) => p.newValue,
        suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
        filter: true,
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

  //
  // const [isFocused, setIsFocused] = useState(false);
  // const onFocus = () => setIsFocused(true);
  // const onBlur = () => setIsFocused(false);

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

  //
  // useEffect(() => {
  //   const handleCopy = () => {
  //     if (typeof navigator !== 'undefined' && isFocused) {
  //       navigator.clipboard.writeText(pastaString);
  //     }
  //   };

  //   document.addEventListener('copy', handleCopy);
  //   return () => {
  //     document.removeEventListener('copy', handleCopy);
  //   };
  // }, [isFocused, pastaString]);

  return {
    gridRef,
    rowData,
    columnDefs,
    getRowId,
    onSelectionChanged,
  };
};
