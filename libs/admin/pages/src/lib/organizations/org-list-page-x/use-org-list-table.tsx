/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  CellEditingStoppedEvent,
  ColDef,
  GetRowIdFunc,
  ValueFormatterParams,
} from 'ag-grid-community';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { useSetAtom } from 'jotai';
import { v4 } from 'uuid';

import {
  ORG_LIST_UNDO_EVENT,
  OrgItem,
  URL_DOMAINS,
} from '@jobstash/admin/core';

import { orgEditRowPayloadAtom, useAllOrgs } from '@jobstash/admin/state';

import { ActivateJobsiteRenderer } from './activate-jobsite-renderer';
import { AvatarCell } from './avatar-cell';
import { UrlStatusRenderer } from './url-status-renderer';

export const useOrgListTable = () => {
  const { data } = useAllOrgs();

  const gridRef = useRef<AgGridReact>(null);

  const getRowId: GetRowIdFunc<OrgItem> = useCallback(
    ({ data: { id } }) => id,
    [],
  );

  const columnDefs: ColDef<OrgItem>[] = useMemo(
    () => [
      {
        checkboxSelection: true,
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
        headerName: 'Avatar',
        width: 100,
        cellRenderer: AvatarCell,
      },
      {
        headerName: 'Name',
        field: 'name',
        filter: true,
        editable: true,
      },
      {
        headerName: 'Logo URL',
        field: 'logoUrl',
        filter: true,
        editable: true,
      },
      {
        headerName: 'Website',
        filter: true,
        editable: true,
        valueGetter: (p) => p.data?.website.join(','),
        valueSetter(p) {
          p.data.website = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
        cellRenderer: UrlStatusRenderer,
      },
      {
        headerName: 'Raw Website',
        filter: true,
        editable: true,
        valueGetter: (p) => p.data?.rawWebsite.join(','),
        valueSetter(p) {
          p.data.rawWebsite = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
        cellRenderer: UrlStatusRenderer,
      },
      {
        headerName: 'Telegram',
        filter: true,
        editable: true,
        valueGetter: (p) => p.data?.telegram.join(','),
        valueSetter(p) {
          p.data.telegram = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <UrlStatusRenderer {...props} domainPrefix={URL_DOMAINS.TELEGRAM} />
        ),
      },
      {
        headerName: 'Github',
        filter: true,
        editable: true,
        valueGetter: (p) => p.data?.github.join(','),
        valueSetter(p) {
          p.data.github = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <UrlStatusRenderer {...props} domainPrefix={URL_DOMAINS.GITHUB} />
        ),
      },
      {
        headerName: 'Discord',
        filter: true,
        editable: true,
        valueGetter: (p) => p.data?.discord.join(','),
        valueSetter(p) {
          p.data.discord = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <UrlStatusRenderer {...props} domainPrefix={URL_DOMAINS.DISCORD} />
        ),
      },
      {
        headerName: 'Twitter',
        filter: true,
        editable: true,
        valueGetter: (p) => p.data?.twitter.join(','),
        valueSetter(p) {
          p.data.twitter = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <UrlStatusRenderer {...props} domainPrefix={URL_DOMAINS.TWITTER} />
        ),
      },
      {
        headerName: 'Docs',
        filter: true,
        editable: true,
        valueGetter: (p) => p.data?.docs.join(','),
        valueSetter(p) {
          p.data.docs = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
        cellRenderer: UrlStatusRenderer,
      },
      {
        headerName: 'Location',
        field: 'location',
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
        valueFormatter: (p: ValueFormatterParams<OrgItem, string>) =>
          p.data!.projects.map((p) => p.name).join(', '),
      },
      {
        headerName: 'Aliases',
        editable: true,
        valueGetter: (p) => p.data?.aliases.join(','),
        valueSetter(p) {
          p.data.aliases = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
      },
      {
        headerName: 'Community',
        editable: true,
        valueGetter: (p) => p.data?.community.join(','),
        valueSetter(p) {
          p.data.community = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
      },
      {
        headerName: 'Grant',
        editable: true,
        valueGetter: (p) => p.data?.grant.join(','),
        valueSetter(p) {
          p.data.grant = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
      },
      {
        headerName: 'Jobsite Url',
        // We don't have support for creating jobsites
        // Edit is only available if there's data
        editable: (p) => (p.data?.jobsite ?? []).length > 0,
        valueGetter: (p) => p.data?.jobsite.flatMap((j) => j.url).join(','),
        valueSetter(p) {
          const editedValue = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .find(Boolean);

          // Only save first element
          p.data.jobsite = [
            {
              ...p.data.jobsite[0],
              url: editedValue,
            },
          ];

          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <UrlStatusRenderer {...props} />
        ),
      },
      {
        headerName: 'Jobsite Type',
        // We don't have support for creating jobsites
        // Edit is only available if there's data
        editable: (p) => (p.data?.jobsite ?? []).length > 0,
        valueGetter: (p) => p.data?.jobsite.flatMap((j) => j.type).join(','),
        valueSetter(p) {
          const editedValue = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .find(Boolean);

          // Only save first element
          p.data.jobsite = [
            {
              ...p.data.jobsite[0],
              type: editedValue,
            },
          ];

          return true;
        },
      },
      {
        headerName: 'Detected Jobsite Url',
        editable: true,
        valueGetter: (p) =>
          p.data?.detectedJobsite.flatMap((j) => j.url).join(','),
        valueSetter(p) {
          const editedValue = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .find(Boolean);

          const oldJobsite = p.data.detectedJobsite[0];

          // Create
          if ((p.data?.detectedJobsite ?? []).length === 0 && editedValue) {
            p.data.detectedJobsite = [
              {
                id: v4(),
                url: editedValue,
                type: '',
              },
            ];
            return true;
          }

          // Delete
          if ((oldJobsite ? !oldJobsite.type : true) && !editedValue) {
            p.data.detectedJobsite = [];
            return true;
          }

          // Update
          p.data.detectedJobsite = [
            {
              ...oldJobsite,
              url: editedValue,
            },
          ];

          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <UrlStatusRenderer {...props} />
        ),
      },
      {
        headerName: 'Detected Jobsite Type',
        editable: true,
        valueGetter: (p) =>
          p.data?.detectedJobsite.flatMap((j) => j.type).join(','),
        valueSetter(p) {
          const editedValue = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .find(Boolean);

          const oldJobsite = p.data.detectedJobsite[0];

          // Create
          if ((p.data?.detectedJobsite ?? []).length === 0 && editedValue) {
            p.data.detectedJobsite = [
              {
                id: v4(),
                url: '',
                type: editedValue,
              },
            ];
            return true;
          }

          // Delete
          if ((oldJobsite ? !oldJobsite.url : true) && !editedValue) {
            p.data.detectedJobsite = [];
            return true;
          }

          // Update
          p.data.detectedJobsite = [
            {
              ...oldJobsite,
              type: editedValue,
            },
          ];

          return true;
        },
      },
      {
        headerName: 'Activate Jobsite',
        width: 144,
        cellRenderer: ActivateJobsiteRenderer,
      },
    ],
    [],
  );

  const setRowPayload = useSetAtom(orgEditRowPayloadAtom);
  const onCellEditingStopped = useCallback(
    (e: CellEditingStoppedEvent<OrgItem>) => {
      const {
        node: { data },
        oldValue,
        newValue,
      } = e;

      const hasChanged = oldValue !== newValue;

      if (data && hasChanged) {
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
    getRowId,
    rowData: data,
    columnDefs,
    onCellEditingStopped,
  };
};
