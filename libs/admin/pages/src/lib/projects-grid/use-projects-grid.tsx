/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  CellEditingStoppedEvent,
  ColDef,
  GetRowIdFunc,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { useSetAtom } from 'jotai';
import { v4 } from 'uuid';

import {
  GRID_UNDO_EVENT,
  ProjectItem,
  URL_DOMAINS,
} from '@jobstash/admin/core';
import { prefixUrl, projectItemToPayload } from '@jobstash/admin/utils';

import {
  projectsGridEditRowPayloadAtom,
  projectsGridPastaStringAtom,
  useAllProjects,
} from '@jobstash/admin/state';

import {
  GridAvatarCellRenderer,
  GridUrlStatusRenderer,
} from '@jobstash/admin/ui';

import { ActivateJobsiteRenderer } from './activate-jobsite-renderer';

export const useProjectsGrid = () => {
  const { data } = useAllProjects();

  const gridRef = useRef<AgGridReact>(null);
  const getRowId: GetRowIdFunc<ProjectItem> = useCallback(
    ({ data: { id } }) => id,
    [],
  );

  const columnDefs: ColDef<ProjectItem>[] = useMemo(
    () => [
      {
        headerName: 'Name',
        field: 'name',
        pinned: 'left',
        editable: true,
        checkboxSelection: true,
        filter: true,
      },
      {
        headerName: 'ID',
        field: 'id',
      },
      {
        headerName: 'Avatar',
        width: 100,
        cellRenderer: ({ data }: CustomCellRendererProps<ProjectItem>) => (
          <GridAvatarCellRenderer
            url={data?.website ?? ''}
            logo={data?.logoUrl}
            name={data?.name}
          />
        ),
      },
      {
        headerName: 'Logo URL',
        field: 'logoUrl',
        filter: true,
        editable: true,
      },
      {
        headerName: 'Category',
        field: 'category',
        filter: true,
        editable: true,
      },
      {
        headerName: 'Website',
        field: 'website',
        autoHeight: true,
        filter: true,
        editable: true,
        cellRenderer: (props: CustomCellRendererProps<ProjectItem>) => (
          <GridUrlStatusRenderer<ProjectItem> {...props} />
        ),
      },
      {
        headerName: 'Github',
        field: 'github',
        autoHeight: true,
        filter: true,
        editable: true,
        cellRenderer: (props: CustomCellRendererProps<ProjectItem>) => (
          <GridUrlStatusRenderer<ProjectItem>
            {...props}
            domainPrefix={URL_DOMAINS.GITHUB}
          />
        ),
      },
      {
        headerName: 'Telegram',
        field: 'telegram',
        autoHeight: true,
        filter: true,
        editable: true,
        cellRenderer: (props: CustomCellRendererProps<ProjectItem>) => (
          <GridUrlStatusRenderer<ProjectItem>
            {...props}
            domainPrefix={URL_DOMAINS.TELEGRAM}
          />
        ),
      },
      {
        headerName: 'Twitter',
        field: 'twitter',
        autoHeight: true,
        filter: true,
        editable: true,
        cellRenderer: (props: CustomCellRendererProps<ProjectItem>) => (
          <GridUrlStatusRenderer<ProjectItem>
            {...props}
            domainPrefix={URL_DOMAINS.TWITTER}
          />
        ),
      },
      {
        headerName: 'Discord',
        field: 'discord',
        autoHeight: true,
        filter: true,
        editable: true,
        cellRenderer: (props: CustomCellRendererProps<ProjectItem>) => (
          <GridUrlStatusRenderer<ProjectItem>
            {...props}
            domainPrefix={URL_DOMAINS.DISCORD}
          />
        ),
      },
      {
        headerName: 'Docs',
        field: 'docs',
        autoHeight: true,
        filter: true,
        editable: true,
        cellRenderer: (props: CustomCellRendererProps<ProjectItem>) => (
          <GridUrlStatusRenderer<ProjectItem> {...props} />
        ),
      },
      {
        headerName: 'Description',
        field: 'description',
        filter: true,
        editable: true,
        cellEditor: 'agLargeTextCellEditor',
        cellEditorPopup: true,
        cellEditorParams: {
          maxLength: 20_000,
        },
      },
      {
        headerName: 'TVL',
        field: 'tvl',
        editable: true,
        cellEditor: 'agNumberCellEditor',
      },
      {
        headerName: 'Monthly Fees',
        field: 'monthlyFees',
        editable: true,
        cellEditor: 'agNumberCellEditor',
      },
      {
        headerName: 'Monthly Volume',
        field: 'monthlyVolume',
        editable: true,
        cellEditor: 'agNumberCellEditor',
      },
      {
        headerName: 'Monthly Revenue',
        field: 'monthlyRevenue',
        editable: true,
        cellEditor: 'agNumberCellEditor',
      },
      {
        headerName: 'Monthly Active Users',
        field: 'monthlyActiveUsers',
        editable: true,
        cellEditor: 'agNumberCellEditor',
      },
      {
        headerName: 'Token Address',
        editable: true,
      },
      {
        headerName: 'Token Symbol',
        field: 'tokenSymbol',
        editable: true,
      },
      {
        headerName: 'DefiLlama ID',
        field: 'defiLlamaId',
        editable: true,
      },
      {
        headerName: 'DefiLlama Slug',
        field: 'defiLlamaSlug',
        editable: true,
      },
      {
        headerName: 'DefiLlama Parent',
        field: 'defiLlamaParent',
        editable: true,
      },
      {
        headerName: 'Mainnet',
        field: 'isMainnet',
        editable: true,
      },
      {
        headerName: 'Jobsite Url',
        autoHeight: true,
        // We don't have support for creating jobsites
        // Edit is only available if there's data
        editable: (p) => (p.data?.jobsites ?? []).length === 1,
        valueGetter: (p) => p.data?.jobsites.flatMap((j) => j.url).join(','),
        valueSetter(p) {
          const editedValue = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .find(Boolean);

          // Only save first element
          p.data.jobsites = [
            {
              ...p.data.jobsites[0],
              url: editedValue,
            },
          ];

          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<ProjectItem>) => (
          <GridUrlStatusRenderer<ProjectItem> {...props} />
        ),
      },
      {
        headerName: 'Jobsite Type',
        autoHeight: true,
        // We don't have support for creating jobsites
        // Edit is only available if there's data
        editable: (p) => (p.data?.jobsites ?? []).length === 1,
        valueGetter: (p) => p.data?.jobsites.flatMap((j) => j.type).join(','),
        valueSetter(p) {
          const editedValue = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .find(Boolean);

          // Only save first element
          p.data.jobsites = [
            {
              ...p.data.jobsites[0],
              type: editedValue,
            },
          ];

          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<ProjectItem>) => (
          <div className="flex flex-col gap-0">
            {props.value.split(',').map((value: string) => (
              <span key={value} className="text-sm text-white/80">
                {value}
              </span>
            ))}
          </div>
        ),
      },
      {
        headerName: 'Detected Jobsite Url',
        autoHeight: true,
        editable: (p) => (p.data?.detectedJobsites ?? []).length === 1,
        valueGetter: (p) =>
          p.data?.detectedJobsites.flatMap((j) => j.url).join(','),
        valueSetter(p) {
          const editedValue = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .find(Boolean);

          const oldJobsite = p.data.detectedJobsites[0];

          // Create
          if ((p.data?.detectedJobsites ?? []).length === 0 && editedValue) {
            p.data.detectedJobsites = [
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
            p.data.detectedJobsites = [];
            return true;
          }

          // Update
          p.data.detectedJobsites = [
            {
              ...oldJobsite,
              url: editedValue,
            },
          ];

          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<ProjectItem>) => (
          <GridUrlStatusRenderer<ProjectItem> {...props} />
        ),
      },
      {
        headerName: 'Detected Jobsite Type',
        autoHeight: true,
        editable: (p) => (p.data?.detectedJobsites ?? []).length === 1,
        valueGetter: (p) =>
          p.data?.detectedJobsites.flatMap((j) => j.type).join(','),
        valueSetter(p) {
          const editedValue = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .find(Boolean);

          const oldJobsite = p.data.detectedJobsites[0];

          // Create
          if ((p.data?.detectedJobsites ?? []).length === 0 && editedValue) {
            p.data.detectedJobsites = [
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
            p.data.detectedJobsites = [];
            return true;
          }

          // Update
          p.data.detectedJobsites = [
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

  const setPastaString = useSetAtom(projectsGridPastaStringAtom);
  const onSelectionChanged = useCallback(
    (e: SelectionChangedEvent<ProjectItem>) => {
      const pastaString = e.api
        .getSelectedNodes()
        .map((node) =>
          [
            node.data!.name,
            node.data!.id,
            node.data!.logoUrl,
            node.data!.category,
            prefixUrl(node.data!.website),
            prefixUrl(node.data!.github, URL_DOMAINS.GITHUB),
            prefixUrl(node.data!.telegram, URL_DOMAINS.TELEGRAM),
            prefixUrl(node.data!.twitter, URL_DOMAINS.TWITTER),
            prefixUrl(node.data!.discord, URL_DOMAINS.DISCORD),
            prefixUrl(node.data!.docs),
            node.data!.description,
            node.data!.tvl,
            node.data!.monthlyFees,
            node.data!.monthlyVolume,
            node.data!.monthlyRevenue,
            node.data!.monthlyActiveUsers,
            node.data!.tokenAddress,
            node.data!.tokenSymbol,
            node.data!.defiLlamaId,
            node.data!.defiLlamaSlug,
            node.data!.defiLlamaParent,
            node.data!.isMainnet,
          ].join('\t'),
        )
        .join(',');

      setPastaString(pastaString);
    },
    [setPastaString],
  );

  const setRowPayload = useSetAtom(projectsGridEditRowPayloadAtom);
  const onCellEditingStopped = useCallback(
    (e: CellEditingStoppedEvent<ProjectItem>) => {
      const {
        node: { data },
        oldValue,
        newValue,
      } = e;

      const hasChanged =
        (newValue === null || typeof newValue === 'boolean'
          ? true
          : Boolean(newValue)) && oldValue !== newValue;

      if (data && hasChanged) {
        setRowPayload({ id: data.id, payload: projectItemToPayload(data) });
      }
    },
    [setRowPayload],
  );

  // Handle revert edit
  useEffect(() => {
    const handleUndoEvent: EventListener = () => {
      gridRef.current!.api.undoCellEditing();
    };

    window.addEventListener(GRID_UNDO_EVENT.PROJECTS, handleUndoEvent);

    return () => {
      window.removeEventListener(GRID_UNDO_EVENT.PROJECTS, handleUndoEvent);
    };
  }, []);

  return {
    gridRef,
    getRowId,
    rowData: data,
    columnDefs,
    onSelectionChanged,
    onCellEditingStopped,
  };
};
