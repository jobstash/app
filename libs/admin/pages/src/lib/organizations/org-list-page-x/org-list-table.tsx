import { AgGridReact } from 'ag-grid-react';

import { useOrgListTable } from './use-org-list-table';

export const OrgListTable = () => {
  const { gridRef, getRowId, rowData, columnDefs, onCellEditingStopped } =
    useOrgListTable();

  if (!rowData) return <p>Loading table ...</p>;

  return (
    <AgGridReact
      ref={gridRef}
      debug
      undoRedoCellEditing
      undoRedoCellEditingLimit={5}
      //
      // reactiveCustomComponents
      // enableCellTextSelection
      // ensureDomOrder
      // suppressRowClickSelection
      getRowId={getRowId}
      //
      // rowData={rowData ? [rowData[201], rowData[6035]] : undefined}
      // rowData={rowData}
      rowData={rowData ? rowData.slice(0, 500) : undefined}
      rowSelection="multiple"
      rowHeight={50}
      columnDefs={columnDefs}
      onCellEditingStopped={onCellEditingStopped}
    />
  );
};
