/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
  CellEditingStoppedEvent,
  ColDef,
  GetRowIdFunc,
  SelectionChangedEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { useSetAtom } from 'jotai';
import { v4 } from 'uuid';

import { GRID_UNDO_EVENT, OrgItem, URL_DOMAINS } from '@jobstash/admin/core';
import { prefixUrl } from '@jobstash/admin/utils';

import {
  orgEditRowPayloadAtom,
  orgListPastaStringAtom,
  useAllOrgs,
} from '@jobstash/admin/state';

import {
  GridAvatarCellRenderer,
  GridUrlStatusRenderer,
} from '@jobstash/admin/ui';

import { ActivateJobsiteRenderer } from './activate-jobsite-renderer';

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
        headerName: 'Org ID',
        field: 'orgId',
        filter: 'agNumberColumnFilter',
        valueGetter: (p) => Number(p.data?.orgId), // Sort as numbers not string
        filterParams: {
          inRangeInclusive: true,
          filterOptions: [
            'inRange',
            'lessThan',
            'greaterThan',
            'contains',
            'blank',
            'notBlank',
          ],
        },
        pinned: 'left',
      },
      {
        headerName: 'Internal Uuid',
        field: 'id',
        filter: true,
      },
      {
        headerName: 'Name',
        field: 'name',
        filter: true,
        editable: true,
      },
      {
        headerName: 'Avatar',
        width: 100,
        cellRenderer: ({ data }: CustomCellRendererProps<OrgItem>) => (
          <GridAvatarCellRenderer
            url={data && data.websites.length > 0 ? data.websites[0] : ''}
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
        headerName: 'Website',
        autoHeight: true,
        filter: true,
        editable: true,
        valueGetter: (p) => p.data?.websites.join(','),
        valueSetter(p) {
          p.data.websites = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <GridUrlStatusRenderer<OrgItem> {...props} />
        ),
      },
      // {
      //   headerName: 'Raw Website',
      //   filter: true,
      //   editable: true,
      //   valueGetter: (p) => p.data?.rawWebsites.join(','),
      //   valueSetter(p) {
      //     p.data.rawWebsites = p.newValue
      //       .split(',')
      //       .map((s: string) => s.trim())
      //       .filter(Boolean);
      //     return true;
      //   },
      //   cellRenderer: GridUrlStatusRenderer,
      // },
      {
        headerName: 'Telegram',
        autoHeight: true,
        filter: true,
        editable: true,
        valueGetter: (p) => p.data?.telegrams.join(','),
        valueSetter(p) {
          p.data.telegrams = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <GridUrlStatusRenderer<OrgItem>
            {...props}
            domainPrefix={URL_DOMAINS.TELEGRAM}
          />
        ),
      },
      {
        headerName: 'Github',
        autoHeight: true,
        filter: true,
        editable: true,
        valueGetter: (p) => p.data?.githubs.join(','),
        valueSetter(p) {
          p.data.githubs = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <GridUrlStatusRenderer<OrgItem>
            {...props}
            domainPrefix={URL_DOMAINS.GITHUB}
          />
        ),
      },
      {
        headerName: 'Discord',
        autoHeight: true,
        filter: true,
        editable: true,
        valueGetter: (p) => p.data?.discords.join(','),
        valueSetter(p) {
          p.data.discords = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <GridUrlStatusRenderer<OrgItem>
            {...props}
            domainPrefix={URL_DOMAINS.DISCORD}
          />
        ),
      },
      {
        headerName: 'Twitter',
        autoHeight: true,
        filter: true,
        editable: true,
        valueGetter: (p) => p.data?.twitters.join(','),
        valueSetter(p) {
          p.data.twitters = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <GridUrlStatusRenderer<OrgItem>
            {...props}
            domainPrefix={URL_DOMAINS.TWITTER}
          />
        ),
      },
      {
        headerName: 'Docs',
        autoHeight: true,
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
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <GridUrlStatusRenderer<OrgItem> {...props} />
        ),
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
        cellEditorParams: {
          maxLength: 20_000,
        },
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
        autoHeight: true,
        field: 'projects',
        valueFormatter: (p: ValueFormatterParams<OrgItem, string>) =>
          p.data!.projects.map((p) => p.name).join(', '),
      },
      {
        headerName: 'Aliases',
        autoHeight: true,
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
        autoHeight: true,
        editable: true,
        valueGetter: (p) => p.data?.communities.join(','),
        valueSetter(p) {
          p.data.communities = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
      },
      {
        headerName: 'Grant',
        autoHeight: true,
        editable: true,
        valueGetter: (p) => p.data?.grants.join(','),
        valueSetter(p) {
          p.data.grants = p.newValue
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);
          return true;
        },
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
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <GridUrlStatusRenderer<OrgItem> {...props} />
        ),
      },
      {
        headerName: 'Jobsite Type',
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
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
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
        cellRenderer: (props: CustomCellRendererProps<OrgItem>) => (
          <GridUrlStatusRenderer<OrgItem> {...props} />
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

  const setPastaString = useSetAtom(orgListPastaStringAtom);
  const onSelectionChanged = useCallback(
    (e: SelectionChangedEvent<OrgItem>) => {
      setPastaString(
        e.api
          .getSelectedNodes()
          .map((node) => {
            const {
              id,
              orgId,
              name,
              logoUrl,
              websites,
              telegrams,
              githubs,
              discords,
              twitters,
              docs,
              location,
              summary,
              description,
              headcountEstimate,
              createdTimestamp,
              updatedTimestamp,
              projects,
              aliases,
              communities,
              grants,
              jobsites,
              detectedJobsites,
              //
              // rawWebsite,
              // jobCount,
              // openEngineeringJobCount,
              // totalEngineeringJobCount,
            } = node.data!;

            return [
              id,
              orgId,
              name,
              logoUrl,
              prefixUrl(websites),
              prefixUrl(telegrams, URL_DOMAINS.TELEGRAM),
              prefixUrl(githubs, URL_DOMAINS.GITHUB),
              prefixUrl(discords, URL_DOMAINS.DISCORD),
              prefixUrl(twitters, URL_DOMAINS.TWITTER),
              prefixUrl(docs),
              location,
              summary,
              description,
              headcountEstimate,
              createdTimestamp,
              updatedTimestamp,
              projects.flatMap((p) => p.name),
              aliases,
              communities,
              grants,
              jobsites.flatMap((j) => j.url),
              jobsites.flatMap((j) => j.type),
              detectedJobsites.flatMap((j) => j.url),
              detectedJobsites.flatMap((j) => j.type),
              //
              // prefixUrl(rawWebsites),
              // jobCount,
              // openEngineeringJobCount,
              // totalEngineeringJobCount,
            ].join('\t');
          })
          .join('\n'),
      );
    },
    [setPastaString],
  );

  const setRowPayload = useSetAtom(orgEditRowPayloadAtom);
  const onCellEditingStopped = useCallback(
    (e: CellEditingStoppedEvent<OrgItem>) => {
      const {
        node: { data },
        oldValue,
        newValue,
      } = e;

      const hasChanged = Boolean(newValue) && oldValue !== newValue;

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

    window.addEventListener(GRID_UNDO_EVENT.ORGS, handleUndoEvent);

    return () => {
      window.removeEventListener(GRID_UNDO_EVENT.ORGS, handleUndoEvent);
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
