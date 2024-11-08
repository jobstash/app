import { AgGridReact } from 'ag-grid-react';

import { JobApplicant } from '@jobstash/jobs/core';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';

import { TableControls } from './table-controls';
import { useApplicantsTable } from './use-applicants-table';

interface Props {
  orgId: string;
  rowData: JobApplicant[] | undefined;
}

export const ApplicantsTable = ({ orgId, rowData }: Props) => {
  const {
    gridRef,
    getRowId,
    columnDefs,
    onChangeQuickFilter,
    //
    // onCellEditingStopped,
  } = useApplicantsTable(orgId);

  return (
    <div className="flex flex-col gap-4 pr-8">
      <TableControls onChangeFilter={onChangeQuickFilter} />
      <div className="ag-theme-quartz" style={{ height: 750 }}>
        <AgGridReact
          ref={gridRef}
          undoRedoCellEditing
          enableCellTextSelection
          ensureDomOrder
          suppressRowClickSelection
          undoRedoCellEditingLimit={5}
          getRowId={getRowId}
          rowData={rowData}
          rowSelection="multiple"
          columnDefs={columnDefs}
          defaultColDef={{
            cellRenderer: EmptyCellPlaceholder,
            sortable: false,
          }}
          //
          // onCellEditingStopped={onCellEditingStopped}
        />
      </div>
    </div>
  );
};
