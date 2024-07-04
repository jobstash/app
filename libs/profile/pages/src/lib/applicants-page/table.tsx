import { AgGridReact } from 'ag-grid-react';

import { JobApplicant } from '@jobstash/jobs/core';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';

import { useApplicantsTable } from './use-applicants-table';

interface Props {
  rowData: JobApplicant[];
}

export const ApplicantsTable = ({ rowData }: Props) => {
  const { gridRef, getRowId, columnDefs } = useApplicantsTable('335');

  return (
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
    />
  );
};
