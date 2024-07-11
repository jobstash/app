import { AgGridReact } from 'ag-grid-react';

import { JobApplicant } from '@jobstash/jobs/core';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';

import { QuickFilterInput } from '../talents-page/quick-filter-input';

import { useApplicantsTable } from './use-applicants-table';

const QUICK_FILTER_PLACEHOLDER = 'Search applicants ...';

interface Props {
  orgId: string;
  rowData: JobApplicant[] | undefined;
}

export const ApplicantsTable = ({ orgId, rowData }: Props) => {
  const {
    gridRef,
    getRowId,
    columnDefs,
    onCellEditingStopped,
    onChangeQuickFilter,
  } = useApplicantsTable(orgId);

  return (
    <div className="flex flex-col gap-4 px-12">
      <QuickFilterInput
        placeholder={QUICK_FILTER_PLACEHOLDER}
        onChange={onChangeQuickFilter}
      />
      <div className="ag-theme-quartz w-full" style={{ height: 700 }}>
        <AgGridReact
          ref={gridRef}
          debug
          undoRedoCellEditing
          enableCellTextSelection
          ensureDomOrder
          suppressRowClickSelection
          undoRedoCellEditingLimit={5}
          getRowId={getRowId}
          rowData={rowData}
          rowSelection="multiple"
          rowHeight={120}
          columnDefs={columnDefs}
          defaultColDef={{
            cellRenderer: EmptyCellPlaceholder,
          }}
          onCellEditingStopped={onCellEditingStopped}
        />
      </div>
    </div>
  );
};
