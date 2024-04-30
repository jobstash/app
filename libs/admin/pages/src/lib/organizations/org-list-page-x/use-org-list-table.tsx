/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import {
  CellEditingStoppedEvent,
  ColDef,
  GetRowIdFunc,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { OrgItem } from '@jobstash/admin/core';
import { notifError, notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { useAllOrgs } from '@jobstash/admin/state';

const columnDefs: ColDef<OrgItem>[] = [
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
    valueGetter: (p) => p.data?.aliases,
    valueFormatter: (p) => JSON.stringify(p.data?.aliases),
    filter: true,
  },
  {
    headerName: 'Community',
    valueGetter: (p) => p.data?.community,
    valueFormatter: (p) => JSON.stringify(p.data?.community),
    filter: true,
  },
  {
    headerName: 'Website',
    valueGetter: (p) => p.data?.website,
    valueFormatter: (p) => JSON.stringify(p.data?.website),
    filter: true,
  },
  {
    headerName: 'Raw Website',
    valueGetter: (p) => p.data?.rawWebsite,
    valueFormatter: (p) => JSON.stringify(p.data?.rawWebsite),
    filter: true,
  },
  {
    headerName: 'Telegram',
    valueGetter: (p) => p.data?.telegram,
    valueFormatter: (p) => JSON.stringify(p.data?.telegram),
    filter: true,
  },
  {
    headerName: 'Github',
    valueGetter: (p) => p.data?.github,
    valueFormatter: (p) => JSON.stringify(p.data?.github),
    filter: true,
  },
  {
    headerName: 'Grant',
    valueGetter: (p) => p.data?.grant,
    valueFormatter: (p) => JSON.stringify(p.data?.grant),
    filter: true,
  },
  {
    headerName: 'Twitter',
    valueGetter: (p) => p.data?.twitter,
    valueFormatter: (p) => JSON.stringify(p.data?.twitter),
    filter: true,
  },
  {
    headerName: 'Docs',
    valueGetter: (p) => p.data?.docs,
    valueFormatter: (p) => JSON.stringify(p.data?.docs),
    filter: true,
  },
  {
    headerName: 'Jobsite',
    valueGetter: (p) => p.data?.jobsite,
    valueFormatter: (p) => JSON.stringify(p.data?.jobsite),
    filter: true,
  },
  {
    headerName: 'Detected Jobsite',
    valueGetter: (p) => p.data?.detectedJobsite,
    valueFormatter: (p) => JSON.stringify(p.data?.detectedJobsite),
    filter: true,
  },
];

export const useOrgListTable = () => {
  const { data, isPending } = useAllOrgs();

  const gridRef = useRef<AgGridReact>(null);
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const getRowId: GetRowIdFunc<OrgItem> = ({
    data: { id },
    // eslint-disable-next-line unicorn/consistent-function-scoping
  }) => id;

  const { isPending: isPendingMutation, mutate, reset } = useFakeMutation();

  const onCellEditingStopped = (e: CellEditingStoppedEvent) => {
    const {
      node: { rowIndex },
      valueChanged,
    } = e;

    if (valueChanged && rowIndex !== null) {
      mutate(undefined, {
        onError() {
          const undoSize = gridRef.current!.api.getCurrentUndoSize();
          console.log({ undoSize });
          gridRef.current!.api.undoCellEditing();

          reset();
        },
      });
    }
  };

  return {
    isPending,
    isPendingMutation,
    gridRef,
    rowData: data,
    columnDefs,
    onBlur,
    onFocus,
    getRowId,
    onCellEditingStopped,
  };
};

const fakeMutate = async () => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 3000));
  throw new Error('pakyu');
};

const useFakeMutation = () =>
  useMutation({
    mutationFn: () => fakeMutate(),
    onMutate() {
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
