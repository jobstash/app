import { AgGridReact } from 'ag-grid-react';

import { JobApplicant } from '@jobstash/jobs/core';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';

import { useApplicantsTable } from './use-applicants-table';

interface Props {
  orgId: string;
  rowData: JobApplicant[] | undefined;
}

export const ApplicantsTable = ({ orgId, rowData }: Props) => {
  const { gridRef, getRowId, columnDefs, onCellEditingStopped } =
    useApplicantsTable(orgId);

  return (
    <div className="ag-theme-quartz w-full px-12" style={{ height: 700 }}>
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
  );
};
