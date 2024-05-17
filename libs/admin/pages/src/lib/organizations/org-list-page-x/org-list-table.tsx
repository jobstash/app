import { AgGridReact } from 'ag-grid-react';

import { useOrgListTable } from './use-org-list-table';

export const OrgListTable = () => {
  const {
    gridRef,
    getRowId,
    rowData,
    columnDefs,
    onSelectionChanged,
    onCellEditingStopped,
  } = useOrgListTable();

  console.log({ rowData: rowData?.slice(0, 10) });

  if (!rowData) return <p>Loading table ...</p>;

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
      //
      // rowData={rowData ? [rowData[201], rowData[6035]] : undefined}
      // rowData={rowData}
      rowData={rowData ? rowData.slice(0, 10) : undefined}
      rowSelection="multiple"
      rowHeight={50}
      columnDefs={columnDefs}
      onSelectionChanged={onSelectionChanged}
      onCellEditingStopped={onCellEditingStopped}
    />
  );
};
