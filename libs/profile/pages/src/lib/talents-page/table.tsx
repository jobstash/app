import { AgGridReact } from 'ag-grid-react';

import { DevTalent } from '@jobstash/profile/core';

import { EmptyCellPlaceholder } from '@jobstash/profile/ui';

import { useTalentsTable } from './use-talents-table';

interface Props {
  rowData: DevTalent[] | undefined;
}

export const DevTalentsTable = ({ rowData }: Props) => {
  const { gridRef, getRowId, columnDefs } = useTalentsTable();
  return (
    <div className="ag-theme-quartz w-full px-12" style={{ height: 750 }}>
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
    </div>
  );
};
