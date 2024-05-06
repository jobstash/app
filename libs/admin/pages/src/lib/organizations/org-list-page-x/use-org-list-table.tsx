/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useCallback, useEffect, useRef, useState } from 'react';

import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import {
  CellEditingStoppedEvent,
  ColDef,
  GetRowIdFunc,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import {
  OrgItem,
  OrgRowItem,
  OrgWebsiteStatusItem,
} from '@jobstash/admin/core';
import { prefixUrl } from '@jobstash/admin/utils';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useAllOrgs } from '@jobstash/admin/state';

import { JSONEditor } from './json-editor';
import { WebsiteStatusCell } from './website-status-cell';

const columnDefs: ColDef<OrgRowItem>[] = [
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
    field: 'website',
    valueFormatter: (p) => JSON.stringify(p.data?.website ?? []),
    valueParser: (p) => p.newValue,
    suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
    filter: true,
    editable: true,
    cellEditor: JSONEditor,
    cellEditorPopup: true,
  },
  {
    headerName: 'Website Status',
    field: 'websiteStatus',
    width: 600,
    minWidth: 300,
    cellRenderer: WebsiteStatusCell,
    comparator(
      valueA: OrgWebsiteStatusItem[],
      valueB: OrgWebsiteStatusItem[],
      _nodeA,
      _nodeB,
      isDescending,
    ) {
      const setA = new Set(valueA.flatMap((v) => v.status));
      const setB = new Set(valueB.flatMap((v) => v.status));

      const wA = getWeight(setA, isDescending);
      const wB = getWeight(setB, isDescending);

      if (wA === wB) return 0;

      return isDescending && wB > wA ? 1 : -1;
    },
  },
  // {
  //   headerName: 'IFrame 1',
  //   field: 'website',
  //   width: 420,
  //   minWidth: 300,
  //   cellRenderer: (p: CustomCellRendererProps) => (
  //     <IFrameCell index={0} website={p.value} />
  //   ),
  //   cellClass: ['overflow-y-auto'],
  // },
  // {
  //   headerName: 'IFrame 2',
  //   field: 'website',
  //   width: 420,
  //   minWidth: 300,
  //   cellRenderer: (p: CustomCellRendererProps) => (
  //     <IFrameCell index={1} website={p.value} />
  //   ),
  //   cellClass: ['overflow-y-auto'],
  // },
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
    headerName: 'Raw Website',
    field: 'rawWebsite',
    valueFormatter: (p) => JSON.stringify(p.data?.rawWebsite ?? []),
    valueParser: (p) => p.newValue,
    suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
    filter: true,
    editable: true,
    cellEditor: JSONEditor,
    cellEditorPopup: true,
  },
  {
    headerName: 'Telegram',
    field: 'telegram',
    valueFormatter: (p) => JSON.stringify(p.data?.telegram ?? []),
    valueParser: (p) => p.newValue,
    suppressKeyboardEvent: (p) => p.editing && p.event.key === 'Enter',
    filter: true,
    editable: true,
    cellEditor: JSONEditor,
    cellEditorPopup: true,
  },
  {
    headerName: 'Github',
    field: 'github',
    valueFormatter: (p) => JSON.stringify(p.data?.github ?? []),
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
    headerName: 'Docs',
    field: 'docs',
    valueFormatter: (p) => JSON.stringify(p.data?.docs ?? []),
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

export const useOrgListTable = () => {
  const { data, isPending } = useAllOrgs();

  const [rowData, setRowData] = useState<OrgRowItem[] | undefined>();
  useEffect(() => {
    if (data && !rowData) {
      setRowData(
        data.map(
          (d) =>
            ({
              ...d,
              websiteStatus: d.website.map((w) => ({
                website: w,
                status: 'pending',
                statusCode: undefined,
              })),
            } as OrgRowItem),
        ),
      );
    }
  }, [data, rowData]);

  const gridRef = useRef<AgGridReact>(null);
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const getRowId: GetRowIdFunc<OrgItem> = ({
    data: { id },
    // eslint-disable-next-line unicorn/consistent-function-scoping
  }) => id;

  const { isPending: isPendingMutation, mutate, reset } = useFakeMutation();

  const onCellEditingStopped = useCallback(
    (e: CellEditingStoppedEvent) => {
      const {
        node: { rowIndex },
        oldValue,
        newValue,
      } = e;

      const valueChanged =
        JSON.stringify(oldValue) !== JSON.stringify(newValue);

      if (valueChanged && rowIndex !== null) {
        mutate(undefined, {
          onError() {
            gridRef.current!.api.undoCellEditing();

            reset();
          },
        });
      }
    },
    [mutate, reset],
  );

  const [pastaString, setPastaString] = useState<string>('');
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
              prefixUrl(telegram, 'telegram.me'),
              prefixUrl(github, 'github.com'),
              prefixUrl(twitter, 'twitter.com'),
              prefixUrl(docs),
              JSON.stringify(jobsite),
              JSON.stringify(detectedJobsite),
            ].join('\t');
          })
          .join('\n'),
      );
    },
    [],
  );

  useEffect(() => {
    const handleCopy = () => {
      if (typeof navigator !== 'undefined' && isFocused) {
        navigator.clipboard.writeText(pastaString);
      }
    };

    document.addEventListener('copy', handleCopy);
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, [isFocused, pastaString]);

  return {
    isPending,
    isPendingMutation,
    gridRef,
    rowData,
    columnDefs,
    onBlur,
    onFocus,
    getRowId,
    onCellEditingStopped,
    onSelectionChanged,
  };
};

const fakeMutate = async () => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 3000));
  //
  // throw new Error('pakyu');
};

const useFakeMutation = () =>
  useMutation({
    mutationFn: () => fakeMutate(),
    onMutate() {
      notifications.clean();
      notifLoading({
        id: TOAST_ID,
        title: 'Updating Organization',
        message: 'Please wait ...',
      });
    },
    onError() {
      notifError({
        id: TOAST_ID,
        title: 'Mutation Failed',
        message: 'Just kidding. dis fake.',
      });
    },
    onSuccess() {
      notifSuccess({
        id: TOAST_ID,
        title: 'Update org successful!',
        message: "That's weird. It should fail.",
      });
    },
  });

const TOAST_ID = 'org-list-mutation';

const getWeight = (statuses: Set<string>, isDescending: boolean): number => {
  if (statuses.has('pending')) {
    return isDescending ? 3 : 1;
  }

  if (statuses.has('dead') || statuses.has('invalid')) {
    return isDescending ? 1 : 3;
  }

  return 2;
};
